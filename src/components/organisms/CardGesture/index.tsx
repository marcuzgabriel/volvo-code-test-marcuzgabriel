import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  withSpring,
} from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { getPanGestureOnUpdate, getPanGestureOnBegin, getPanGestureOnEnd } from './gestures';

const SLIDING_THRESHOLD_PIXEL = 32;
const GLOBAL_PADDING = 64;

interface CardGestureProps {
  cardWidth: Animated.SharedValue<number>;
  translationX: Animated.SharedValue<number>;
  currentItemVisible: Animated.SharedValue<number>;
  updateCurrentVisibleItem: Animated.SharedValue<number>;
  children: React.ReactNode;
}

export interface GestureParams {
  cardWidth: Animated.SharedValue<number>;
  startX: Animated.SharedValue<number>;
  prevDragX: Animated.SharedValue<number>;
  dragX: Animated.SharedValue<number>;
  translationX: Animated.SharedValue<number>;
  panningDirection: Animated.SharedValue<string>;
  maxTranslationXLength: Animated.SharedValue<number>;
  maximumNumberOfItems: Animated.SharedValue<number>;
  gestureIsDead: Animated.SharedValue<boolean>;
  itemVisibilityWidth: Animated.SharedValue<number>;
  currentItemVisible: Animated.SharedValue<number>;
  springConfig: { [key: string]: number | boolean };
  thresHold: number;
}

const CardGesture: React.FC<CardGestureProps> = ({
  cardWidth,
  currentItemVisible,
  updateCurrentVisibleItem,
  translationX,
  children,
}) => {
  const { breakpoint, animationConfigs } = useTheme();
  const startX = useSharedValue(0);
  const prevDragX = useSharedValue(0);
  const dragX = useSharedValue(0);
  const panningDirection = useSharedValue('none');
  const gestureCardWidth = useSharedValue(0);
  const maxTranslationXLength = useSharedValue(0);
  const derivedWindowWidth = useSharedValue(0);
  const derivedGestureCardWidth = useSharedValue(0);
  const itemVisibilityWidth = useSharedValue(0);
  const maximumNumberOfItems = useSharedValue(0);
  const gestureIsDead = useSharedValue(false);

  const { width: windowWidth } = useWindowDimensions();

  useAnimatedReaction(
    () => cardWidth,
    res => {
      if (res.value !== itemVisibilityWidth.value) {
        itemVisibilityWidth.value = res.value;
      }
    },
    [cardWidth],
  );

  useAnimatedReaction(
    () => updateCurrentVisibleItem,
    () => {
      if (currentItemVisible.value !== updateCurrentVisibleItem.value) {
        const leftValue = -Math.ceil(updateCurrentVisibleItem.value) * itemVisibilityWidth.value;
        const rightValue = -Math.floor(updateCurrentVisibleItem.value) * itemVisibilityWidth.value;

        if (
          updateCurrentVisibleItem.value <= maximumNumberOfItems.value &&
          updateCurrentVisibleItem.value >= 0
        ) {
          currentItemVisible.value = updateCurrentVisibleItem.value;
        }

        if (maxTranslationXLength.value < 0) {
          return;
        }

        if (rightValue < -maxTranslationXLength.value) {
          translationX.value = withSpring(
            -maxTranslationXLength.value,
            animationConfigs.defaultSpringConfig,
          );

          return;
        } else if (leftValue >= 0) {
          translationX.value = withSpring(0, animationConfigs.defaultSpringConfig);
          return;
        } else {
          translationX.value = withSpring(
            updateCurrentVisibleItem.value < currentItemVisible.value ? leftValue : rightValue,
            animationConfigs.defaultSpringConfig,
          );
        }
      }
    },
    [updateCurrentVisibleItem, maximumNumberOfItems, maxTranslationXLength],
  );

  useAnimatedReaction(
    () => ({ windowWidth, maxTranslationXLength, gestureCardWidth }),
    () => {
      if (
        derivedWindowWidth.value !== windowWidth ||
        derivedGestureCardWidth.value !== gestureCardWidth.value
      ) {
        const visiblePixels =
          windowWidth > +breakpoint.size['large']
            ? +breakpoint.size['large']
            : windowWidth - GLOBAL_PADDING;

        maxTranslationXLength.value = gestureCardWidth.value - visiblePixels;
        maximumNumberOfItems.value = Math.ceil(maxTranslationXLength.value / cardWidth.value);
        gestureIsDead.value = maxTranslationXLength.value < 0;
        derivedGestureCardWidth.value = gestureCardWidth.value;
        derivedWindowWidth.value = windowWidth;
      }
    },
    [windowWidth, gestureCardWidth, itemVisibilityWidth, derivedWindowWidth, translationX],
  );

  const gestureParams = {
    startX,
    prevDragX,
    dragX,
    translationX,
    panningDirection,
    maxTranslationXLength,
    itemVisibilityWidth,
    currentItemVisible,
    updateCurrentVisibleItem,
    cardWidth,
    gestureIsDead,
    maximumNumberOfItems,
    thresHold: SLIDING_THRESHOLD_PIXEL,
    springConfig: animationConfigs.defaultSpringConfig,
  };

  const panGestureOnBegin = getPanGestureOnBegin(gestureParams);
  const panGestureOnUpdate = getPanGestureOnUpdate(gestureParams);
  const panGestureOnEnd = getPanGestureOnEnd(gestureParams);

  const panGesture = Gesture.Pan()
    .onBegin(panGestureOnBegin)
    .onUpdate(panGestureOnUpdate)
    .onEnd(panGestureOnEnd);

  const animatedStyle = useAnimatedStyle(() => ({
    flexDirection: 'row',
    transform: [{ translateX: translationX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={animatedStyle}
        onLayout={e => {
          gestureCardWidth.value = e.nativeEvent.layout.width;
        }}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default CardGesture;
