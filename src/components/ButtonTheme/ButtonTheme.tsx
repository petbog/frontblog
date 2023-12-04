import { FC, useState } from 'react';
import { Theme } from '../../Context/ThemeContext';
import { useTheme } from '../../Context/hooks/useTheme';
import s from './ButtonTheme.module.scss'
import sun from '../../img/sun.svg'
import moon from '../../img/moon.svg'


const ButtonTheme: FC = () => {
    const [imgChange, setImgChange] = useState<boolean>(false)
    const [img, setImg] = useState<string>(sun)
 

    const theme = useTheme()


    const handleTheme = () => {
        theme.changeTheme(theme.theme === Theme.LIGTH ? Theme.DARK : Theme.LIGTH)
        setImgChange(!imgChange)
           
    if(imgChange === false ){
        setImg(moon)
    }else{
        setImg(sun) 
    }
    }

    return (
        <div onClick={handleTheme} className={s.theme}>
            <img  className={s.theme_img} src={img} alt="" />
        </div>
    )
}

export default ButtonTheme