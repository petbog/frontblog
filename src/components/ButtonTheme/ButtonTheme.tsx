import { useTheme } from '../../Context/hooks/useTheme';
import s from './ButtonTheme.module.scss'

const ButtonTheme = () => {
    const theme = useTheme()


    const handleTheme = () => {
        theme.changeTheme(theme.theme === 'ligth' ? 'dark' : 'ligth')
    }



    return (
        <div onClick={handleTheme} className={s.theme}>кнопка</div>
    )
}

export default ButtonTheme