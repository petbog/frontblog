import { ReactNode, useState } from 'react'
import { Theme, ThemeContext } from '../ThemeContext'
import { ChangeCssRootVareibals } from '../../model/ChangeCssRootVareibals'
import { storage } from '../../model/Storage'

type props = {
    children: ReactNode
}


export const ThemeProvider = ({ children, ...props }: props) => {

    const [theme, setSheme] = useState<Theme>(storage.getItem('theme') || Theme.LIGTH)

    ChangeCssRootVareibals(theme)
    const changeTheme = (theme: Theme) => {
        storage.setItem('theme', theme)
        setSheme(theme)
        ChangeCssRootVareibals(theme)
    }

    return <ThemeContext.Provider value={{
        theme,
        changeTheme
    }}
        {...props}>{children}</ThemeContext.Provider>
}

