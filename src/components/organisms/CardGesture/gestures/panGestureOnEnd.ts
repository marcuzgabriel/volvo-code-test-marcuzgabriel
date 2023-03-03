import { withSpring } from 'react-native-reanimated';
import type { GestureParams } from '../';

export const getPanGestureOnEnd =
  ({
    startX,
    translationX,
    dragX,
    panningDirection,
    springConfig,
    maxTranslationXLength,
    itemVisibilityWidth,
    currentItemVisible,
    cardWidth,
    maximumNumberOfItems,
    gestureIsDead,
  }: GestureParams) =>
  () => {
    panningDirection.value = startX.value > dragX.value ? 'left' : 'right';
    currentItemVisible.value =
      panningDirection.value === 'left'
        ? Math.ceil(translationX.value / -itemVisibilityWidth.value)
        : Math.floor(translationX.value / -itemVisibilityWidth.value);

    if (currentItemVisible.value > maximumNumberOfItems.value) {
      currentItemVisible.value = maximumNumberOfItems.value;
    } else if (currentItemVisible.value < 0) {
      currentItemVisible.value = 0;
    }

    const leftValue =
      -Math.ceil(translationX.value / -itemVisibilityWidth.value) * itemVisibilityWidth.value;
    const rightValue =
      -Math.floor(translationX.value / -itemVisibilityWidth.value) * itemVisibilityWidth.value;
    const isPanningLeft = panningDirection.value === 'left';

    if (leftValue >= 0 || gestureIsDead.value) {
      translationX.value = withSpring(0, springConfig);
    } else if (isPanningLeft && rightValue - cardWidth.value < -maxTranslationXLength.value) {
      translationX.value = withSpring(-maxTranslationXLength.value, springConfig);
    } else {
      translationX.value = withSpring(
        panningDirection.value === 'left'
          ? -Math.ceil(currentItemVisible.value) * itemVisibilityWidth.value
          : -Math.floor(currentItemVisible.value) * itemVisibilityWidth.value,
        springConfig,
      );
    }
  };
