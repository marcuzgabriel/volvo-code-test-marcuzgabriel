import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VCCUIProvider from '@volvo/ui/containers/VCCUIProvider';
import type { AppProps } from 'next/app';
import 'raf/polyfill';
import 'setimmediate';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <VCCUIProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Component {...pageProps} />
    </GestureHandlerRootView>
  </VCCUIProvider>
);

export default MyApp;
