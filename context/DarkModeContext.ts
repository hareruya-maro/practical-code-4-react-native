import { createContext } from "react"

export interface DarkModeContext {
    dark: boolean;
    setDark: (value: boolean) => void;
    useDeviceColorScheme: boolean;
    setUseDeviceColorScheme: (value: boolean) => void;
}

export const DarkModeContext = createContext({} as DarkModeContext)
