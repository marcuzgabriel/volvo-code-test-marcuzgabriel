import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  useAnimatedReaction,
} from 'react-native-reanimated';

const isAndroid = Platform.OS === 'android';

interface AppearanceProps {
  delay?: number;
  resetAppearance?: boolean;
  children: React.ReactNode;
}

const Appearance: React.FC<AppearanceProps> = ({ delay = 0, resetAppearance, children }) => {
  const { animationConfigs } = useTheme();
  const translationY = useSharedValue(50);
  const animatedStyle = useAnimatedStyle(() => ({
    width: '100%',
    opacity: isAndroid ? 1 : interpolate(translationY.value, [0, 50], [1, 0]),
    transform: [
      {
        translateY: translationY.value,
      },
    ],
  }));

  useAnimatedReaction(
    () => resetAppearance,
    res => {
      if (typeof res === 'boolean') {
        translationY.value = 50;
        translationY.value = withDelay(delay, withSpring(0, animationConfigs.defaultSpringConfig));
      }
    },
    [resetAppearance],
  );

  useEffect(() => {
    if (!resetAppearance) {
      translationY.value = withDelay(delay, withSpring(0, animationConfigs.defaultSpringConfig));
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Appearance;
