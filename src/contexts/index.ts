import { createContext } from 'react';

export const VCCUIProviderContext = createContext<Record<string, any>>({});
export const { Provider: VCCUIProvider } = VCCUIProviderContext;
