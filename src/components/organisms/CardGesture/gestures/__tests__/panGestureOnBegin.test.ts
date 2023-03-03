/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { getPanGestureOnBegin } from '../';

const PARAMS = {
  startX: { value: 0 } as Animated.SharedValue<number>,
  translationX: { value: 0 } as Animated.SharedValue<number>,
};

describe('src/components/organisms/CardGesture/gestures/getPanGestureOnBegin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update startX to translationX', () => {
    renderHook(() => {
      PARAMS.translationX = useSharedValue(50);
    });

    getPanGestureOnBegin(PARAMS as any)();

    expect(PARAMS.startX.value).toBe(50);
  });
});
