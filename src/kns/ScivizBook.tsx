import { Heading } from "@chakra-ui/react";
import { P, A, BlockCode, Img } from "../components";

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
        """Distribution of height & weight\n"""
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

const legendAlternatives = `import numpy as np
from matplotlib.axes import Axes
import matplotlib.pyplot as plt

def legend_alternatives():
    X = np.linspace(-np.pi, np.pi, 400, endpoint=True)
    C, S = np.cos(X), np.sin(X)
    label_2_Y = {"cosine": C, "sine": S}
    label_2_xi = {"cosine": 100, "sine": 200}

    def plot(ax: Axes):
        ax.set_xlim((-np.pi, np.pi))
        ax.set_xticks([-np.pi, -np.pi / 2, 0, np.pi / 2, np.pi])
        ax.set_xticklabels(["-π", "-π/2", "0", "+π/2", "+π"])
        ax.set_ylim((-1, 1))
        ax.set_yticks([-1, 0, 1])
        ax.set_yticklabels(["-1", "0", "+1"])

        ax.spines["right"].set_visible(False)
        ax.spines["top"].set_visible(False)
        ax.spines["left"].set_position(("data", -3.25))
        ax.spines["bottom"].set_position(("data", -1.25))

        # no clip because y-axis cuts of >1, <-1
        (plot1,) = ax.plot(X, C, label="cosine", clip_on=False)
        (plot2,) = ax.plot(X, S, label="sine", clip_on=False)

        return plot1, plot2

    n = 4
    fig = plt.figure(figsize=(6, n * 2))

    # one ax over all for common labels
    ax = fig.add_subplot(111)
    ax.tick_params(labelcolor="w", top=False, bottom=False, left=False, right=False)
    ax.spines["left"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["bottom"].set_visible(False)
    ax.spines["top"].set_visible(False)
    ax.set_xlabel("Angle", va="center", weight="bold")
    ax.xaxis.set_label_coords(x=0.5, y=-0.1)
    ax.set_ylabel("Value", ha="center", weight="bold")
    ax.yaxis.set_label_coords(x=-0.1, y=0.5)

    # clip_on=False is actually default
    ax = fig.add_subplot(n, 1, 1)
    for p in plot(ax):
        label = p.get_label()
        color = p.get_color()
        Y = label_2_Y[label]
        ax.text(
            x=X[-1],
            y=Y[-1],
            s=f" — {label}",
            size="small",
            color=color,
            ha="left",
            va="center",
            clip_on=False,  # is outside of x-axis
        )

    ax.set_title("Trigonometric functions", x=1, y=1.2, ha="right")

    ax = fig.add_subplot(n, 1, 2)
    for p in plot(ax):
        label = p.get_label()
        color = p.get_color()
        Y = label_2_Y[label]
        xi = label_2_xi[label]
        ax.text(
            x=X[xi],
            y=Y[xi],
            s=f" {label}",
            family="Roboto Condensed",
            size="small",
            bbox={"facecolor": "white", "edgecolor": "None", "alpha": 0.85},
            color=color,
            ha="center",
            va="center",
            rotation=42.5,
        )

    ax = fig.add_subplot(n, 1, 3)
    for p in plot(ax):
        label = p.get_label()
        color = p.get_color()
        Y = label_2_Y[label]
        xi = label_2_xi[label]
        ax.annotate(
            text=label,
            xy=(X[xi], Y[xi]),
            size="small",
            color=color,
            xytext=(-50, +10),
            textcoords="offset points",
            arrowprops={
                "arrowstyle": "->",
                "color": color,
                "connectionstyle": "arc3,rad=-0.3",
            },
        )

    ax = fig.add_subplot(n, 1, 4)
    index = 10
    for p in plot(ax):
        label = p.get_label()
        color = p.get_color()
        Y = label_2_Y[label]
        ax.scatter(
            x=[X[index]],
            y=[Y[index]],
            s=100,
            marker="o",
            zorder=10,
            clip_on=False,  # circle would be cut off below -1
            linewidth=1,
            edgecolor=color,
            facecolor="white",
        )
        ax.text(
            x=X[index],
            y=1.01 * Y[index],
            s="A",
            zorder=20,  # place over white circle
            color=color,
            ha="center",
            va="center",
            size="x-small",
            clip_on=False,  # A would be cut off below -1
        )

    plt.tight_layout()
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
      <P>asd</P>
      <Heading variant="h4">asd</Heading>
      <P>asd</P>
      <BlockCode code={legendTrickery} lang="python" />
      <Heading variant="h4">asd</Heading>
      <P>asd</P>
      <BlockCode code={legendAlternatives} lang="python" />
      <Heading variant="h4">asd</Heading>
      <P>asd</P>
      <BlockCode code={annotationZoom} lang="python" />
      <Heading variant="h4">asd</Heading>
      <P>asd</P>
      <BlockCode code={coloredLines} lang="python" />
    </>
  );
}
