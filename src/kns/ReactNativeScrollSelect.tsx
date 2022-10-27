import { P, A, Code, BlockCode, Img } from "../components";

const fullCode = `import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HEIGHT = 250;
const WIDTH = 250;

const TOP_GRAD = [
  "rgba( 255, 255, 255, 1 )",
  "rgba( 255, 255, 255, 0.9 )",
  "rgba( 255, 255, 255, 0.7 )",
  "rgba( 255, 255, 255, 0.5 )",
];

const BOT_GRAD = [
  "rgba( 255, 255, 255, 0.5 )",
  "rgba( 255, 255, 255, 0.7 )",
  "rgba( 255, 255, 255, 0.9 )",
  "rgba( 255, 255, 255, 1 )",
];

interface ItemType {
  value: number;
  label: string;
}

function dummyFact(n: number): ItemType[] {
  return Array(n).fill({ value: -1, label: "" });
}

interface PickerItemProps {
  item: ItemType;
  index: number;
  height: number;
}

function PickerItem(props: PickerItemProps): JSX.Element {
  const height = { height: props.height };
  return (
    <View key={props.index} style={[styles.itemView, height]}>
      <Text style={styles.itemText}>{props.item.label}</Text>
    </View>
  );
}

interface OnScrollType {
  index: number;
  item: ItemType;
}

interface ScrollSelectionPickerProps {
  items: ItemType[];
  onScroll: ({ index, item }: OnScrollType) => void;
  scrollTo?: number;
  transparentRows?: number;
}

export default function ScrollSelectionPicker(
  props: ScrollSelectionPickerProps
): JSX.Element {
  const scroll = React.useRef<ScrollView>(null);
  const [idx, setIdx] = React.useState(0);

  const n = props.transparentRows || 3;
  const itemHeight = HEIGHT / (n * 2 + 1);
  const gradHeight = n * itemHeight;
  const extItems = [...dummyFact(n), ...props.items, ...dummyFact(n)];

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const tmpIdx = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
    if (idx !== tmpIdx && tmpIdx >= 0 && tmpIdx < props.items.length) {
      setIdx(tmpIdx);
      props.onScroll({ index: tmpIdx, item: props.items[tmpIdx] });
    }
  }

  React.useEffect(() => {
    if (props.scrollTo) {
      scroll.current?.scrollTo({
        y: props.scrollTo * itemHeight,
        animated: true,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => onScroll(event)}
        snapToInterval={itemHeight}
        snapToAlignment="center"
        decelerationRate="fast"
        scrollEventThrottle={0}
      >
        {extItems.map((d, i) => (
          <PickerItem key={i} item={d} index={i} height={itemHeight} />
        ))}
      </ScrollView>
      <View
        pointerEvents="none"
        style={[styles.gradientWrapper, styles.bottomBorder]}
      >
        <LinearGradient
          colors={TOP_GRAD}
          style={[styles.pickerGradient, { height: gradHeight }]}
        />
      </View>
      <View
        pointerEvents="none"
        style={[styles.gradientWrapper, styles.topBorder]}
      >
        <LinearGradient
          colors={BOT_GRAD}
          style={[styles.pickerGradient, { height: gradHeight }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
  },
  itemView: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "gray",
  },
  gradientWrapper: {
    position: "absolute",
    width: "100%",
  },
  bottomBorder: {
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  topBorder: {
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  pickerGradient: {
    width: "100%",
  },
});`;

const partOne = `const n = props.transparentRows || 3;
const itemHeight = HEIGHT / (n * 2 + 1);
const gradHeight = n * itemHeight;
const extItems = [...dummyFact(n), ...props.items, ...dummyFact(n)];

function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
  const tmpIdx = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
  if (idx !== tmpIdx && tmpIdx >= 0 && tmpIdx < props.items.length) {
    setIdx(tmpIdx);
    props.onScroll({ index: tmpIdx, item: props.items[tmpIdx] });
  }
}`;

const partTwo = `const scroll = React.useRef<ScrollView>(null);
//...
React.useEffect(() => {
  if (props.scrollTo) {
    scroll.current?.scrollTo({
      y: props.scrollTo * itemHeight,
      animated: true,
    });
  }
}, []);`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/scrollselects.png"
        width="550px"
        height="280px"
      />
      <P>
        I was working on a{" "}
        <A label="React Native" href="https://reactnative.dev/" /> app with{" "}
        <A label="Expo" href="https://expo.dev/" /> for Android. I wanted to add
        a scrollable select input but I did not want to include any library
        outside of Expo or RN. It turns out such a simple UI element actually
        takes a lot of work. First things first, here is the full code. The
        image above is what it looks like on my phone (light and dark themes).
      </P>
      <BlockCode code={fullCode} lang="typescript" />
      <P>
        Some explanation. This thing is basically a{" "}
        <A label="ScrollView" href="https://reactnative.dev/docs/scrollview" />{" "}
        with two overlayed{" "}
        <A label="Views" href="https://reactnative.dev/docs/view" /> on top of
        it. The <Code>ScrollView</Code> is the main component. More on that
        later. The two <Code>View</Code>s are used with{" "}
        <A
          label="LinearGradient"
          href="https://docs.expo.dev/versions/latest/sdk/linear-gradient/"
        />{" "}
        to create this effect of disappearing values to the top and the bottom.
        The gradients <Code>TOP_GRAD</Code> and <Code>BOT_GRAD</Code> basically
        just define white background color with increasing/decreasing alpha.
        With some border styling we create these two horizontal lines and it
        looks like the middle item is the selected one.
      </P>
      <P>
        <Code>ScrollView</Code> doesn't know any of this. It just knows how far
        you scroll up/down or left/right. That's where all the{" "}
        <Code>itemHeight</Code> calculations come into play. If we want to show
        3 disappearing items on the top and bottom of the selected item the
        whole <Code>ScrollView</Code> needs to fit 7 items into its height. From
        that we know how high each item has to be. And with that we can
        calculate which item is currently selected from the{" "}
        <Code>contentOffset.y</Code> of the scroll event. There is one more
        thing. Since we always have 7 items with the middle one selected we
        can't select the first 3 and last 3 ones. If you scroll all the way up,
        the 4th item will be selected. That's why we need to add 3 invisible
        dummy items to the top and bottom.
      </P>
      <BlockCode lang="typescript" code={partOne} />
      <P>
        We can make the scroll behaviour of <Code>ScrollView</Code> be aware of
        the items by setting <Code>{"snapToInterval={itemHeight}"}</Code> and{" "}
        <Code>{'snapToAlignment="center"'}</Code>. Then, scrolling will always
        stop with an item in the center of the selection. Additionally, I wanted
        to make the thing scroll up to a certain position when it is loading.
        There is a <Code>scrollTo</Code> method on <Code>ScrollView</Code> which
        allows us to do that. I put it into a <Code>useEffect(..., [])</Code> so
        that it is executed after the component mounts. You can enable an
        animation with it.
      </P>
      <BlockCode lang="typescript" code={partTwo} />
      <P>So yeah.. that's it. Feel free to use it.</P>
    </>
  );
}
