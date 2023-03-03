import type { GestureParams } from '../';

export const getPanGestureOnBegin =
  ({ startX, translationX }: GestureParams) =>
  () => {
    startX.value = translationX.value;
  };
