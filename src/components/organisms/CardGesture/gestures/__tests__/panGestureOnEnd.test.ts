/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { getPanGestureOnEnd } from '../';

const {
  withReanimatedTimer,
  advanceAnimationByTime,
} = require('react-native-reanimated/lib/reanimated2/jestUtils');

const ADVANCE_ANIMATION_BY_TIME_SPRING = 1500;
const PARAMS = {
  cardWidth: { value: 0 } as Animated.SharedValue<number>,
  startX: { value: 0 } as Animated.SharedValue<number>,
  prevDragX: { value: 0 } as Animated.SharedValue<number>,
  dragX: { value: 0 } as Animated.SharedValue<number>,
  translationX: { value: 0 } as Animated.SharedValue<number>,
  panningDirection: { value: 'left' } as Animated.SharedValue<string>,
  maxTranslationXLength: { value: 0 } as Animated.SharedValue<number>,
  maximumNumberOfItems: { value: 0 } as Animated.SharedValue<number>,
  gestureIsDead: { value: false } as Animated.SharedValue<boolean>,
  itemVisibilityWidth: { value: 0 } as Animated.SharedValue<number>,
  currentItemVisible: { value: 0 } as Animated.SharedValue<number>,
  springConfig: {},
  thresHold: 0,
};

describe('src/components/organisms/CardGesture/gestures/getPanGestureOnEnd', () => {
  beforeEach(() => {
    renderHook(() => {
      PARAMS.cardWidth = useSharedValue(0);
      PARAMS.startX = useSharedValue(0);
      PARAMS.prevDragX = useSharedValue(0);
      PARAMS.dragX = useSharedValue(0);
      PARAMS.translationX = useSharedValue(0);
      PARAMS.panningDirection = useSharedValue('left');
      PARAMS.maxTranslationXLength = useSharedValue(0);
      PARAMS.maximumNumberOfItems = useSharedValue(0);
      PARAMS.gestureIsDead = useSharedValue(false);
      PARAMS.itemVisibilityWidth = useSharedValue(0);
      PARAMS.currentItemVisible = useSharedValue(0);
      PARAMS.currentItemVisible = useSharedValue(0);
      PARAMS.springConfig = {};
      PARAMS.thresHold = 0;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set the panning direction to left when startX is higher than dragX', () => {
    renderHook(() => {
      PARAMS.startX = useSharedValue(50);
      PARAMS.dragX = useSharedValue(25);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.panningDirection.value).toBe('left');
  });

  it('should set the panning direction to right when startX is lower than dragX', () => {
    renderHook(() => {
      PARAMS.startX = useSharedValue(50);
      PARAMS.dragX = useSharedValue(75);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.panningDirection.value).toBe('right');
  });

  it('should calculate the current visibile item when panning direction is left', () => {
    renderHook(() => {
      PARAMS.maximumNumberOfItems = useSharedValue(5);
      PARAMS.panningDirection = useSharedValue('left');
      PARAMS.translationX = useSharedValue(-200);
      PARAMS.itemVisibilityWidth = useSharedValue(200);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.currentItemVisible.value).toBe(1);
  });

  it(`should set currentItemVisible to maximum number of items if the calculation
  current visibile item exceeds maximum`, () => {
    renderHook(() => {
      PARAMS.maximumNumberOfItems = useSharedValue(5);
      PARAMS.panningDirection = useSharedValue('right');
      PARAMS.translationX = useSharedValue(-199);
      PARAMS.itemVisibilityWidth = useSharedValue(200);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.currentItemVisible.value).toBe(0);
  });

  it(`should set currentItemVisible to 0 if the calculation of current visible item
  goes higher 0`, () => {
    renderHook(() => {
      PARAMS.maximumNumberOfItems = useSharedValue(5);
      PARAMS.panningDirection = useSharedValue('right');
      PARAMS.translationX = useSharedValue(1);
      PARAMS.itemVisibilityWidth = useSharedValue(200);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.currentItemVisible.value).toBe(0);
  });

  it(`should set currentItemVisible to 5 if the calculation of current visible item
  goes higher than maxTranslationXLength`, () => {
    renderHook(() => {
      PARAMS.maxTranslationXLength = useSharedValue(1000);
      PARAMS.translationX = useSharedValue(-1001);
      PARAMS.maximumNumberOfItems = useSharedValue(5);
      PARAMS.panningDirection = useSharedValue('left');
      PARAMS.itemVisibilityWidth = useSharedValue(200);
    });

    getPanGestureOnEnd(PARAMS as any)();

    expect(PARAMS.currentItemVisible.value).toBe(PARAMS.maximumNumberOfItems.value);
  });

  it('should run withSpring animation to 0 if user is trying to pan higher than 0', () => {
    withReanimatedTimer(() => {
      renderHook(() => {
        PARAMS.startX = useSharedValue(50);
        PARAMS.dragX = useSharedValue(75);
        PARAMS.translationX = useSharedValue(100);
        PARAMS.itemVisibilityWidth = useSharedValue(200);
      });

      getPanGestureOnEnd(PARAMS as any)();
      advanceAnimationByTime(ADVANCE_ANIMATION_BY_TIME_SPRING);

      expect(PARAMS.translationX.value).toBe(0);
    });
  });

  it('should run withSpring animation to 0 if gesture is dead', () => {
    withReanimatedTimer(() => {
      renderHook(() => {
        PARAMS.translationX = useSharedValue(100);
        PARAMS.gestureIsDead = useSharedValue(true);
      });

      getPanGestureOnEnd(PARAMS as any)();
      advanceAnimationByTime(ADVANCE_ANIMATION_BY_TIME_SPRING);

      expect(PARAMS.translationX.value).toBe(0);
    });
  });

  it(`should run withSpring animation to maxTranslationX if the user is panning left and the translation
  value is outside its boundaries`, () => {
    withReanimatedTimer(() => {
      renderHook(() => {
        PARAMS.startX = useSharedValue(2000);
        PARAMS.dragX = useSharedValue(1000);
        PARAMS.maxTranslationXLength = useSharedValue(1000);
        PARAMS.translationX = useSharedValue(-1001);
        PARAMS.cardWidth = useSharedValue(200);
        PARAMS.itemVisibilityWidth = useSharedValue(200);
      });

      getPanGestureOnEnd(PARAMS as any)();
      advanceAnimationByTime(ADVANCE_ANIMATION_BY_TIME_SPRING);

      expect(PARAMS.translationX.value).toBe(-PARAMS.maxTranslationXLength.value);
    });
  });

  it(`should run withSpring animation to next current visibile item when the user translates within
  his boundaries`, () => {
    withReanimatedTimer(() => {
      renderHook(() => {
        PARAMS.startX = useSharedValue(900);
        PARAMS.dragX = useSharedValue(800);
        PARAMS.maximumNumberOfItems = useSharedValue(5);
        PARAMS.maxTranslationXLength = useSharedValue(1000);
        PARAMS.translationX = useSharedValue(-750);
        PARAMS.cardWidth = useSharedValue(200);
        PARAMS.itemVisibilityWidth = useSharedValue(200);
      });

      getPanGestureOnEnd(PARAMS as any)();
      advanceAnimationByTime(ADVANCE_ANIMATION_BY_TIME_SPRING);

      expect(PARAMS.translationX.value).toBe(
        -Math.ceil(PARAMS.currentItemVisible.value) * PARAMS.itemVisibilityWidth.value,
      );
    });
  });
});
