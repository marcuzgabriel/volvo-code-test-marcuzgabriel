/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { getPanGestureOnUpdate } from '../';

const PARAMS = {
  cardWidth: { value: 0 } as Animated.SharedValue<number>,
  startX: { value: 0 } as Animated.SharedValue<number>,
  prevDragX: { value: 0 } as Animated.SharedValue<number>,
  dragX: { value: 0 } as Animated.SharedValue<number>,
  translationX: { value: 0 } as Animated.SharedValue<number>,
};

describe('src/components/organisms/CardGesture/gestures/getPanGestureOnUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update dragX to startX.value added with current user translationX', () => {
    renderHook(() => {
      PARAMS.startX = useSharedValue(50);
      PARAMS.dragX = useSharedValue(0);
    });

    getPanGestureOnUpdate(PARAMS as any)({ translationX: 100 } as any);
    expect(PARAMS.dragX.value).toBe(150);
  });

  it('should update prevDrag to current dragX', () => {
    renderHook(() => {
      PARAMS.dragX = useSharedValue(150);
    });

    getPanGestureOnUpdate(PARAMS as any)({ translationX: 100 } as any);
    expect(PARAMS.prevDragX.value).toBe(150);
  });
});
