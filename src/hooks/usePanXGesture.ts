import {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

export const usePanXGesture = (
  onDelete: () => void,
  onComplete: () => void
) => {
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);
  const dragDirectionShared = useSharedValue("none");

  const directionCalculated = useSharedValue(false);

  const initialTouchLocation = useSharedValue<{
    x: number;
    y: number;
  } | null>(null);

  const hapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePanX = (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    "worklet";
    const dragX = startX.value + e.translationX;

    if (
      (offsetX.value > 100 && dragX <= 100) ||
      (offsetX.value <= 100 && dragX > 100) ||
      (offsetX.value < -100 && dragX >= -100) ||
      (offsetX.value >= -100 && dragX < -100)
    ) {
      runOnJS(hapticFeedback)();
    }

    offsetX.value = dragX;
  };

  const panXGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      initialTouchLocation.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
      };
      directionCalculated.value = false;
    })
    .onTouchesMove((evt, state) => {
      if (directionCalculated.value) return;

      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }
      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y
      );
      const isHorizontalPanning = xDiff > yDiff * 2;
      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }

      directionCalculated.value = true;
    })
    .onStart((e) => {
      startX.value = offsetX.value;
      const dragX = e.translationX + startX.value;
      dragDirectionShared.value =
        dragX > 0 ? "right" : dragX < 0 ? "left" : "none";
    })
    .onUpdate((e) => {
      handlePanX(e);
    })
    .onEnd(() => {
      if (offsetX.value > 100) {
        offsetX.value = withTiming(0, {}, () => {
          if (offsetX.value === 0) {
            runOnJS(onComplete)();
          }
        });
      } else if (offsetX.value < -100) {
        offsetX.value = withTiming(0, {}, () => {
          if (offsetX.value === 0) {
            runOnJS(onDelete)();
          }
        });
      } else {
        offsetX.value = withTiming(0);
      }
    });

  return {
    offsetX,
    panXGesture,
  };
};
