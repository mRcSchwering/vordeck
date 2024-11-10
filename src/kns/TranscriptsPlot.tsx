import { Heading } from "@chakra-ui/react";
import { P, BlockCode, Img, Code, A } from "../components";

const wholeCode = `import numpy as np
import matplotlib.patches as patches
import matplotlib.pyplot as plt
import random
import matplotlib.patheffects as path_effects

def generate_data(
    genome_size: int,
    p_start=0.01,
    p_end=0.01,
    p_dom=0.05,
    dom_size=30,
    dom_types=("catalytic", "transporter", "regulatory"),
):
    n_cdss = np.random.poisson(p_start * genome_size * 2, 1)[0]
    starts = random.choices(range(genome_size), k=n_cdss)
    cdslens = np.random.geometric(p=p_end, size=len(starts))
    orients = np.random.uniform(0, 1, size=len(starts)) > 0.5
    transcripts = []
    cds_i = 0
    for start, cdslen, orient in zip(starts, cdslens, orients):
        stop = start + cdslen
        if stop < genome_size:
            domains = []
            coord = start
            while coord < stop - dom_size:
                if random.uniform(0, 1) <= p_dom:
                    dom_type = random.choice(dom_types)
                    domains.append((dom_type, coord, coord + dom_size))
                    coord += dom_size
                coord += 1
            transcripts.append((f"CDS{cds_i}", start, stop, orient, domains))
            cds_i += 1
    return transcripts, (0, genome_size)

def plot_transcripts(
    genome_range: tuple[int, int],
    transcripts: list[tuple[str, int, int, bool, list[tuple[str, int, int]]]],
    color_map: dict[str, str],
    title="Transcripts",
    figsize=(10, 6),
    xpad=0.02,
    ypad=0.05,
    bar_height=0.8,
    arrow_headlen=0.3,
    base_color="0.5",
):
    # generate y coords for forward and reverse transcripts
    n_fwd = sum(d[3] for d in transcripts)
    n_bwd = len(transcripts) - n_fwd
    ys_fwd = list(reversed(range(1, n_fwd + 1)))
    ys_bwd = [-1 * d for d in range(1, n_bwd + 1)]

    # transform data structure into arrays
    x_cds = []
    y_cds = []
    labels_cds = []
    y_doms = []
    x_doms = []
    labels_doms = []
    for label, x0, x1, is_fwd, cds_doms in transcripts:
        labels_cds.append(label)
        y = ys_fwd.pop(0) if is_fwd else ys_bwd.pop(0)
        y_cds.append(y)
        x_cds.append((x0, x1))
        for label_dom, x0_dom, x1_dom in cds_doms:
            labels_doms.append(label_dom)
            y_doms.append(y)
            x_doms.append((x0_dom, x1_dom))

    X = np.array(x_cds)
    Y = np.array(y_cds)
    L = np.array(labels_cds)
    Yd = np.array(y_doms)
    Xd = np.array(x_doms)
    Ld = np.array(labels_doms)

    # x-axis spine will be manually limited
    # plot area will be drawn slightly larger with a padding
    xlims = genome_range
    ylims = (Y.min(), Y.max())
    xpad = (xlims[1] - xlims[0]) * xpad
    ypad = (ylims[1] - ylims[0]) * ypad
    pxlims = (xlims[0] - xpad, xlims[1] + xpad)  # padded limits
    pylims = (ylims[0] - ypad, ylims[1] + ypad)  # padded limits

    fig = plt.figure(figsize=figsize)
    point_size = fig.dpi / 72  # point size in px

    ax = fig.add_subplot(111, xlim=pxlims, ylim=pylims)
    ax.spines["top"].set_visible(False)
    ax.spines["left"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["bottom"].set_position(("data", 0))  # middle will represent genome
    ax.spines["bottom"].set_bounds(*xlims)
    ax.spines["bottom"].set_zorder(0)
    ax.spines["bottom"].set_linewidth(2)  # slightly thicker to represent genome
    ax.set_yticks(ticks=[])
    ax.xaxis.grid(linestyle="--", color="0.7")
    ax.set_axisbelow(True)

    # outlining text in plot for better readability
    text_outline = [
        path_effects.Stroke(linewidth=2 * point_size, foreground="white"),
        path_effects.Normal(),
    ]

    # labels centered on spine, outline added
    ax.tick_params(length=0, pad=-2 * point_size, labelsize=10)
    for ticklab in ax.xaxis.get_majorticklabels():
        ticklab.set_path_effects(text_outline)

    data_2_px = ax.transData.transform  # data domain to figure
    px_2_data = ax.transData.inverted().transform  # figure to data domain

    # get head_length as fraction of arrow width
    # so that it doesnt grow longer with longer genomes
    # this is needed with FancyArrow (simple arrow can be set in point)
    dy = bar_height * arrow_headlen
    dpx = data_2_px([(0, dy)]) - data_2_px([(0, 0)])
    arrowlen = (px_2_data([(dpx[0, 1], dpx[0, 0])]) - px_2_data([(0, 0)]))[0, 0]

    # add transcript labels, draw FancyArrows first only for the tip
    # actual transcripts and domains will be drawn over that with barh
    for y, label, (x0, x1) in zip(Y, L, X):

        # arrow head will be slightly smaller than barh
        # because it is sometimes draw 1px too high creating a visible nick
        xtip = x1 + arrowlen  # tip of arrow head
        yl = y - 0.5 * bar_height  # low corner of arrow head
        yh = y + 0.5 * bar_height  # high corner of arrow head
        if y < 0:
            x0, x1 = x1, x0
            xtip = x1 - arrowlen

        # label for each transcript
        txt = ax.annotate(
            text=label,
            xy=(x0, y),
            xytext=(-point_size if y > 0 else point_size, 0),
            textcoords="offset points",
            va="center",
            ha="right" if y > 0 else "left",
        )
        txt.set_path_effects(text_outline)

        # draw arrow head alone
        arrow = patches.Polygon(
            [(x1, yl), (x1, yh), (xtip, y)], fc=base_color, ec="white"
        )
        ax.add_patch(arrow)

    # only with barh are multiple stacked bars aligned
    # with Rectangle or FancyArrow there are 1px shifts
    ax.barh(
        y=Y, left=X[:, 0], width=X[:, 1] - X[:, 0], height=bar_height, color=base_color
    )
    for label, color in color_map.items():
        M = Ld == label
        ax.barh(
            y=Yd[M],
            left=Xd[M][:, 0],
            width=Xd[M][:, 1] - Xd[M][:, 0],
            height=bar_height,
            color=color,
            label=label,
        )

    # create 5'-3' annotations
    termbbox = {"boxstyle": "circle", "fc": "black"}
    ax.annotate(
        text="5'",
        xy=(xlims[0], 0),
        va="center",
        ha="center",
        bbox=termbbox,
        color="white",
        fontweight="heavy",
    )
    ax.annotate(
        text="3'",
        xy=(xlims[1], 0),
        va="center",
        ha="center",
        bbox=termbbox,
        color="white",
        fontweight="heavy",
    )

    # remove outermost labels, they can overlap with 5'-3'
    ticklabs = ax.xaxis.get_majorticklabels()
    for ticklab in ticklabs[:2] + ticklabs[-2:]:
        ticklab.set_visible(False)

    fig.legend(
        loc="lower center",
        ncols=len(color_map),
        facecolor="none",
        edgecolor="none",
    )
    fig.suptitle(title)
    plt.show()`;

export default function Page(): JSX.Element {
  return (
    <>
      <P>
        Sometimes I spend way too much time on trying to get a plot right. I
        decided to start saving the code for such non-trivial plots for future
        reference.
      </P>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/refs/heads/main/imgs/transcript_plot.png"
        width="800px"
        height="400px"
      />
      <P>
        This is a plot I was using for{" "}
        <A href="https://magic-soup.readthedocs.io/" label="Magicsoup" /> a
        package that simulates cell metabolic and pathway evolution. The goal is
        to visualize the transcriptome of a cell. Cell transcripts are often
        visualized as bars or arrows above or below the x-axis as the cell's
        genome. Usually, arrows above the genome represent transcripts in the
        forward (5'-3') direction while arrows below the genome represent
        transcripts in the reverse-complement (3'-5') direction. In this
        particular case I want to highlight certain regions within these error
        with colors. There are 3 domain types which are each represented by one
        color.
      </P>
      <Heading variant="h4">Code</Heading>
      <P>
        The whole code is shown below. A major challenge was drawing the
        transcript arrows. First, I wanted to use{" "}
        <Code>patches.FancyArrow</Code> as gray transcript arrow, then draw
        colorful <Code>barh</Code> domains over it. This doesn't work because{" "}
        <Code>patches.FancyArrow</Code> is not rendered in a very reproducible
        way. This means sometimes it is rendered a pixel higher or lower. Which
        in turn means the following <Code>barh</Code> are not exactly aligned
        anymore. This creates artifacts: <i>e.g.</i> gray 1 pixel high lines
        shimmereing behind the domain regions and edges where the domain regions
        start and end. Only <Code>barh</Code> really draws repetitive lines
        precisely in the same way. So, the arrow stems have to be done using{" "}
        <Code>barh</Code>. This means <Code>patches.Polygon</Code> can be used
        just to draw the arrow head triangle. However,{" "}
        <Code>patches.Polygon</Code> also doesn't draw very precisely (just as{" "}
        <Code>patches.FancyArrow</Code>). This means the arrow head will not
        always appear flush with the arrow stem. I tried slightly downscaling
        the triangle, but it would always create some artifacts. Eventually, I
        gave up and gave the triangle a white outline. Now, the arrow head does
        not appear connected anymore, but it also hints the actual end
        coordinate of the transcript.
      </P>
      <P>
        Another challenge is making the plot scale in different directions.
        Sometimes there might be just 1 transcript, sometimes there may be 50.
        Some genomes are below 1000 base pairs, some are a few thousand. The
        ratio of the arrow head length to the arrow width should always be
        constant. Otherwise the arrow head would sometimes appear longer or
        shorter. For that I am using <Code>ax.transData</Code> to first
        calculate how many pixels the arrow width occupies on the y-axis, to
        then use <Code>ax.transData.inverted()</Code> to calculate how many base
        pairs would create this many pixels on the x-axis.
      </P>
      <BlockCode code={wholeCode} lang="python" />
    </>
  );
}
