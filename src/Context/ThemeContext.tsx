import { createContext } from "react";

type Props = {
    theme: string,
    changeTheme: (theme: string) => void
}
export const ThemeContext = createContext<Props>({
    theme: '',
    changeTheme: () => { }
})