import { createContext } from "react"

export interface AppContext {
    dark: boolean;
    setDark: (value: boolean) => void;
    useDeviceColorScheme: boolean;
    setUseDeviceColorScheme: (value: boolean) => void;
}

export const AppContext = createContext({} as AppContext)
