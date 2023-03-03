import React from 'react';
import { useTheme, StyleProvider, ThemePicker } from 'vcc-ui';
import {
  DefaultTheme as DefaultThemeWeb,
  ThemeProvider as ThemeProviderWeb,
} from 'styled-components';

interface Props {
  children: React.ReactNode;
}

/* NOTE: Used to provide the Volvo theme with further customization
and integrate it into styled-components */
const StyledThemeProvider: React.FC<Props> = ({ children }): React.ReactElement => {
  const theme = useTheme();
  const animationConfigs = {
    defaultSpringConfig: {
      damping: 19,
      mass: 0.5,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 1,
    },
  };

  // @ts-expect-error merging a non existing type
  theme.animationConfigs = animationConfigs;

  return <ThemeProviderWeb theme={theme as DefaultThemeWeb}>{children}</ThemeProviderWeb>;
};

const VCCUIProvider: React.FC<Props> = ({ children }): React.ReactElement => (
  <StyleProvider>
    <ThemePicker variant="light">
      <StyledThemeProvider>{children}</StyledThemeProvider>
    </ThemePicker>
  </StyleProvider>
);

export default VCCUIProvider;
