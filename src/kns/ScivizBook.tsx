import { Heading } from "@chakra-ui/react";
import { P, A, BlockCode, Img, Code } from "../components";

const coloredLines = `import numpy as np
from matplotlib.colors import Colormap
import matplotlib.patches as patches
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

def colored_lines():
    X = np.linspace(-5 * np.pi, +5 * np.pi, 2500)
    xlims = [X.min(), X.max()]
    ylims = [-2, 2]
    cmap = plt.get_cmap("rainbow")

    def f(d: int) -> np.ndarray:
        dy = d / 2 + (1 - np.abs(X) / X.max()) ** 2
        dx = 1 + d / 3
        return dy * np.sin(dx * X) + 0.1 * np.cos(3 + 5 * X)

    def plot(ax: Axes, X: np.ndarray, Y: np.ndarray, cmap: Colormap, alpha: float):
        P = np.array([X, Y]).T.reshape(-1, 1, 2)  # reshape to points
        S = np.concatenate([P[:-1], P[1:]], axis=1)  # connected lines segments (Nx2)
        C = cmap(np.linspace(0, 1, len(S)))
        L = LineCollection(S, color=C, alpha=alpha, linewidth=1.25)
        ax.add_collection(L)

    _ = plt.figure(figsize=(12, 3), frameon=False)  # dont draw fig background
    ax = plt.subplot(1, 1, 1, xticks=[], yticks=[], xlim=xlims, ylim=ylims)
    ax.set_position([0, 0, 1, 1])  # draw plot axes across the whole figure
    ax.patch.set_facecolor("black")  # this is the axes-only background

    for d in np.linspace(0, 1, 15):
        plot(ax, X, f(d), cmap, d)  # increasing alpha

    plt.show()`;

const legendTrickery = `import numpy as np
import matplotlib.pyplot as plt

def legend_trickery():
    n = 250
    np.random.seed(1)
    X, Y = np.zeros(2 * n), np.zeros(2 * n)
    S, C = np.zeros(2 * n), np.zeros(2 * n)

    X[:n] = np.random.normal(1.60, 0.1, n)
    Y[:n] = np.random.normal(50, 10, n)
    S[:n] = np.random.uniform(25, 50, n)
    C[:n] = 0

    X[n:] = np.random.normal(1.75, 0.1, n)
    Y[n:] = np.random.normal(75, 10, n)
    S[n:] = np.random.uniform(25, 50, n)
    C[n:] = 1

    fig = plt.figure(figsize=(5, 5))
    cmap = plt.get_cmap("RdYlBu")
    ax = fig.add_subplot(111)

    ax.set_xlabel("Height (m)", weight="medium")
    ax.set_ylabel("Weight (kg)", weight="medium")
    ax.set_title(
        """Distribution of height & weight\\n"""
        """according to sex & age (fake data)""",
        family="serif",
    )

    # this is to get these fused point outlines
    scatter = ax.scatter(X, Y, s=S, edgecolor="black", linewidth=0.75, zorder=-20)
    scatter = ax.scatter(X, Y, s=S, edgecolor="None", facecolor="white", zorder=-10)
    scatter = ax.scatter(X, Y, c=C, s=S, cmap=cmap, edgecolor="None", alpha=0.25)

    # generate legend for sizes only
    handles, labels = scatter.legend_elements(
        prop="sizes",  # describe point "size"
        num=3,  # target elements in legend (not sure why 3 gives 2 elements)
        alpha=1,  # otherwise outline is a bit hidden (not sure why)
        markeredgewidth=0.5,  # add visible outline
        markeredgecolor="black",  # black outline
        markerfacecolor="None",
    )
    legend = ax.legend(
        handles,
        labels,
        title=" Age",
        loc=(0.6, 0.05),  # location in plot (relative)
        handletextpad=0.1,  # otherwise labels are far away from elements (points?)
        labelspacing=0.25,  # otherwise labels quite far away from each other (points?)
        facecolor="None",
        edgecolor="None",
        alignment="left",  # align title and elements within legend box
        title_fontproperties={"weight": "medium"},
    )

    # explicitly add as artist even though ax.legend() already draws legend
    # because second call to ax.legend() will redraw that legend
    ax.add_artist(legend)

    handles, labels = scatter.legend_elements(
        prop="colors", markeredgewidth=0.0, markeredgecolor="black"
    )
    labels = ["Female", "Male"]
    ax.legend(
        handles,
        labels,
        title=" Sex",
        loc=(0.75, 0.05),  # location in plot (relative)
        handletextpad=0.1,  # otherwise labels are far away from elements (points?)
        labelspacing=0.25,  # otherwise labels quite far away from each other (points?)
        facecolor="None",
        edgecolor="None",
        alignment="left",  # align title and elements within legend box
        prop={"weight": "medium"},  # legend font properties
        title_fontproperties={"weight": "medium"},  # title font props
    )

    ax.scatter(X, [19] * len(X), marker="|", color=cmap(C), linewidth=0.5, alpha=0.25)
    ax.scatter([1.3] * len(X), Y, marker="_", color=cmap(C), linewidth=0.5, alpha=0.25)
    plt.show()`;

const annotationZoom = `import numpy as np
import matplotlib.patches as patches
import matplotlib.pyplot as plt

def annotation_zoom():
    n = 5
    np.random.seed(123)
    X = np.random.normal(0, 0.35, 1000)
    Y = np.random.normal(0, 0.35, 1000)
    I = np.random.choice(len(X), size=n, replace=False)
    Px, Py = X[I], Y[I]

    # sort to avoid crossing lines
    I = np.argsort(Y[I])[::-1]
    Px, Py = Px[I], Py[I]

    fig = plt.figure(figsize=(5, 4))
    gs = fig.add_gridspec(nrows=n, ncols=n + 1)

    # main plot
    ax = plt.subplot(
        gs[:n, :n], xlim=[-1, +1], xticks=[], ylim=[-1, +1], yticks=[], aspect=1
    )
    ax.scatter(X, Y, edgecolor="None", facecolor="C1", alpha=0.5)
    ax.scatter(Px, Py, edgecolor="black", facecolor="None", linewidth=0.75)

    dx, dy = 0.075, 0.075  # argin around zoomed points
    for i, (x, y) in enumerate(zip(Px, Py)):
        # zoomed plot on the sode
        sax = fig.add_subplot(
            gs[i, n],
            xlim=[x - dx, x + dx],
            xticks=[],
            ylim=[y - dy, y + dy],
            yticks=[],
            aspect=1,
        )
        sax.scatter(X, Y, edgecolor="None", facecolor="C1", alpha=0.5)
        sax.scatter(Px, Py, edgecolor="black", facecolor="None", linewidth=0.75)
        sax.text(
            x=1.1,
            y=0.5,
            s="Point " + chr(ord("A") + i),
            rotation=90,
            size=8,
            ha="left",
            va="center",
            transform=sax.transAxes,
        )

        # rectangle around area in main plot
        rect = patches.Rectangle(
            xy=(x - dx, y - dy),
            width=2 * dx,
            height=2 * dy,
            edgecolor="black",
            facecolor="None",
            linestyle="--",
            linewidth=0.75,
        )
        ax.add_patch(rect)

        # arrow between rect and zoomed plot
        con = patches.ConnectionPatch(
            xyA=(x, y),
            coordsA=ax.transData,
            xyB=(0, 0.5),
            coordsB=sax.transAxes,
            linestyle="--",
            linewidth=0.75,
            patchA=rect,
            arrowstyle="->",
        )
        fig.add_artist(con)

    plt.tight_layout()
    plt.show()`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://matplotlib.org/stable/_static/logo_dark.svg"
        width="300px"
        height="50px"
      />
      <P>
        I have used <A href="https://matplotlib.org/" label="matplotlib" /> for
        about 10 years for simple plots. It wasn't until recently when I read{" "}
        <A
          label="Nicolas P. Rougier's 'Scientific Visualization'"
          href="https://www.amazon.com/dp/2957990105"
        />{" "}
        that I realized I was barely scratching it's surface. The book is
        available{" "}
        <A
          label="online (PDF)"
          href="https://inria.hal.science/hal-03427242/document"
        />{" "}
        and can be build from{" "}
        <A
          label="online (PDF)"
          href="https://github.com/rougier/scientific-visualization-book"
        />
        . It's a guide on using matplotlib for scientific visualization that
        goes a bit beyond standard scatter plots and bar charts. It comes with a
        few excercises and examples of non-trivial plots. I decided to highlight
        a few of these non-trivial plots for future reference. These{" "}
        <A
          href="https://github.com/matplotlib/cheatsheets"
          label="cheatsheets"
        />{" "}
        are particularly suitable as an attachement.
      </P>
      <Heading variant="h4">Line Collections</Heading>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/refs/heads/main/imgs/colored-lines.png"
        width="800px"
        height="170px"
      />
      <P>
        The trick for the above plot is to draw many short connected lines each
        with slightly different color. This is done using{" "}
        <Code>LineCollection</Code>. The code is shown below. In addition to
        that <Code>alpha</Code> is increased with every line(-collection) to
        create this fade-away effect. The book also links a color stack for{" "}
        <A
          href="https://github.com/rougier/scientific-visualization-book/blob/master/code/colors/open-colors.py"
          label="Open colors"
        />{" "}
        and{" "}
        <A
          href="https://github.com/rougier/scientific-visualization-book/blob/master/code/colors/material-colors.py"
          label="Material colors"
        />
        .
      </P>
      <BlockCode code={coloredLines} lang="python" />
      <Heading variant="h4">Combining Legends</Heading>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/refs/heads/main/imgs/legend-trickery.png"
        width="600px"
        height="600px"
      />
      <P>
        The figure above makes maybe a bit excessive use effects to show some
        ornaments. Instead of drawing a default legend, one legend for each
        property (size and color) is designed. See comments in the code below
        for details. One alternative to legends is to describe elements within
        the plot.{" "}
        <A
          label="Here"
          href="https://github.com/rougier/scientific-visualization-book/blob/master/code/ornaments/legend-alternatives.py"
        />{" "}
        are some examples of elegantly describing parts of the plot without
        creating a legend.
      </P>
      <BlockCode code={legendTrickery} lang="python" />
      <Heading variant="h4">Annotation Zoom</Heading>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/refs/heads/main/imgs/annotation-zoom.png"
        width="600px"
        height="600py"
      />
      <P>
        This is one way of highlighting a certain area within the plot. The code
        for it is shown below. Note how <Code>Gridspec</Code> is used for
        creating one main plot and 5 smaller subplots. Also note that we have to
        manually ensure to not have these annotation lines cross each other.
        Having zoomed-in subplots next to the main plot, one could also draw the
        zoomed-in plot into the main plot. This is shown in{" "}
        <A
          href="https://github.com/rougier/scientific-visualization-book/blob/master/code/rules/rule-3.py"
          label="this example"
        />
        , which uses <Code>zoomed_inset_axes</Code> from{" "}
        <Code>mpl_toolkits.axes_grid1.inset_locator</Code>.
      </P>
      <BlockCode code={annotationZoom} lang="python" />
    </>
  );
}
