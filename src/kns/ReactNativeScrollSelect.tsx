import { P, H4, Link, Code, BlockCode, Img } from "./components";

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

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/hparam_space.jpg"
        width="700px"
        height="200px"
      />
      <P>
        I was working on a{" "}
        <Link label="React Native" href="https://reactnative.dev/" /> app with{" "}
        <Link label="Expo" href="https://expo.dev/" /> for Android. I wanted to
        add a number select input but I did not want to include any library
        outside of Expo or RN. It turns out such a simple UI element actually
        takes a lot of work. First things first, here is the full code.
      </P>
      <BlockCode code={fullCode} lang="typescript" />
      <P>
        So far so good. But your model is pretty heavy and needs a GPU to train
        on. Fortunately, you have 4 GPUs for yourself. You know that a single
        trial just fits on one GPU. That means you don't need to split up a
        training onto multiple GPUs. It is much faster to train on a single GPU
        if possible. Ideally you just want to start it like{" "}
        <Code>CUDA_VISIBLE_DEVICES=0,1,2,3 python main.py</Code> and the thing
        will start up 4 trials while each trial gets one of the 4 defined GPUs.
        If one of the trials finishes it releases the GPU for another trial to
        start.
      </P>
    </>
  );
}
