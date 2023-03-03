import { GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { GestureParams } from '../';

export const getPanGestureOnUpdate =
  ({ startX, prevDragX, dragX, translationX }: GestureParams) =>
  (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    prevDragX.value = dragX.value;
    dragX.value = startX.value + e.translationX;
    translationX.value = dragX.value;
  };
