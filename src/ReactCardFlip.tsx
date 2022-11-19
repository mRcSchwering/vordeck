/**
 * from https://github.com/AaronCCWong/react-card-flip
 * but package wasnt Ract18 compatible
 * (https://github.com/AaronCCWong/react-card-flip/issues/100)
 */
import * as React from "react";
import { useEffect, useState, useMemo } from "react";

export interface ReactFlipCardProps {
  /**
   * z-Index for the flip card. Used to help solve context stack issues while using multiple flip cards.
   * @default 'auto'
   */
  cardZIndex?: string;
  /**Extra css styling that can be applied to the container.
   * @default {}
   */
  containerStyle?: {};
  /**
   * Custom container class name.
   * @default undefined
   */
  containerClassName?: string;
  /**
   * False to show the front of the card, true to show the back
   * @default undefined
   */
  isFlipped?: boolean;
  /**
   * The speed of the flip animation when the card flips from back to front, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedBackToFront?: number;
  /**
   * The speed of the flip animation when the card flips from front to back, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedFrontToBack?: number;

  cardStyles?: { front?: {}; back?: {} };
  /**
   * False to rotate in opposite directions on both sides of the card, true to rotate in the same direction
   * @default false
   */
  infinite?: boolean;

  /**Direction of the card flip (options are: 'horizontal' or 'vertical' )
   * @default 'horizontal'
   */
  flipDirection?: "horizontal" | "vertical";
  children: [React.ReactNode, React.ReactNode];
}

const ReactCardFlip: React.FC<ReactFlipCardProps> = (props) => {
  const {
    cardStyles,
    cardZIndex,
    containerStyle,
    containerClassName,
    flipDirection,
    flipSpeedFrontToBack,
    flipSpeedBackToFront,
    infinite,
  } = props;

  const back = cardStyles?.back;
  const front = cardStyles?.front;

  const [isFlipped, setFlipped] = useState(props.isFlipped);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (props.isFlipped !== isFlipped) {
      setFlipped(props.isFlipped);
      setRotation((c) => c + 180);
    }
  }, [props.isFlipped, isFlipped]);

  const getContainerClassName = useMemo(() => {
    let className = "react-card-flip";
    if (containerClassName) {
      className += ` ${containerClassName}`;
    }
    return className;
  }, [containerClassName]);

  const getComponent = (key: 0 | 1) => {
    if (props.children.length !== 2) {
      throw new Error(
        "Component ReactCardFlip requires 2 children to function"
      );
    }
    return props.children[key];
  };

  const frontRotateY = `rotateY(${
    infinite ? rotation : isFlipped ? 180 : 0
  }deg)`;
  const backRotateY = `rotateY(${
    infinite ? rotation + 180 : isFlipped ? 0 : -180
  }deg)`;
  const frontRotateX = `rotateX(${
    infinite ? rotation : isFlipped ? 180 : 0
  }deg)`;
  const backRotateX = `rotateX(${
    infinite ? rotation + 180 : isFlipped ? 0 : -180
  }deg)`;

  const styles: any = {
    back: {
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      height: "100%",
      left: "0",
      position: isFlipped ? "relative" : "absolute",
      top: "0",
      transform: flipDirection === "horizontal" ? backRotateY : backRotateX,
      transformStyle: "preserve-3d",
      transition: `${flipSpeedFrontToBack}s`,
      width: "100%",
      ...back,
    },
    container: {
      perspective: "1000px",
      zIndex: `${cardZIndex}`,
    },
    flipper: {
      height: "100%",
      position: "relative",
      width: "100%",
    },
    front: {
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      height: "100%",
      left: "0",
      position: isFlipped ? "absolute" : "relative",
      top: "0",
      transform: flipDirection === "horizontal" ? frontRotateY : frontRotateX,
      transformStyle: "preserve-3d",
      transition: `${flipSpeedBackToFront}s`,
      width: "100%",
      zIndex: "2",
      ...front,
    },
  };

  return (
    <div
      className={getContainerClassName}
      style={{ ...styles.container, ...containerStyle }}
    >
      <div className="react-card-flipper" style={styles.flipper}>
        <div className="react-card-front" style={styles.front}>
          {getComponent(0)}
        </div>

        <div className="react-card-back" style={styles.back}>
          {getComponent(1)}
        </div>
      </div>
    </div>
  );
};

ReactCardFlip.defaultProps = {
  cardStyles: {
    back: {},
    front: {},
  },
  cardZIndex: "auto",
  containerStyle: {},
  flipDirection: "horizontal",
  flipSpeedBackToFront: 0.6,
  flipSpeedFrontToBack: 0.6,
  infinite: false,
  isFlipped: false,
};

export default ReactCardFlip;
