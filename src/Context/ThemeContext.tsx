import { createContext } from "react";

type Props = {
    theme: Theme,
    changeTheme: (theme: Theme) => void
}

export enum Theme {
    LIGTH = 'ligth',
    DARK = 'dark',
}
export const ThemeContext = createContext<Props>({
    theme: Theme.LIGTH,
    changeTheme: () => { }
})