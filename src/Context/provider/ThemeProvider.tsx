import { ReactNode, useState } from 'react'
import { ThemeContext } from '../ThemeContext'
import { ChangeCssRootVareibals } from '../../model/ChangeCssRootVareibals'

type props = {
    children: ReactNode
}


export const ThemeProvider = ({ children, ...props }: props) => {

    const [theme, setSheme] = useState<string>('ligth')

    const changeTheme = (theme: string) => {
        setSheme(theme)
        ChangeCssRootVareibals(theme)
    }

    return <ThemeContext.Provider value={{
        theme,
        changeTheme
    }}
        {...props}>{children}</ThemeContext.Provider>
}

