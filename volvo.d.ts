import type { CurrentTheme } from 'vcc-ui/dist/types/shared';

/* NOTE: CurrentTheme lacks types for the attribute breakpoint */
type VolvoThemeWithLackingBreakPointTypes = CurrentTheme & {
  breakpoint: {
    size: {
      medium: string;
      large: string;
      'x-large': string;
    };
  };
  animationConfigs: {
    defaultSpringConfig: {
      damping: number;
      massS: number;
      stiffness: number;
      overshootClamping: boolean;
      restSpeedThreshold: number;
      restDisplacementThreshold: number;
    };
  };
};

declare module 'styled-components/native' {
  export interface DefaultTheme extends VolvoThemeWithLackingBreakPointTypes {}
}
