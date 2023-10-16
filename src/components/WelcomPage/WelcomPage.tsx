import s from './WelcomPage.module.scss'
import { FC } from 'react';
import space from '../../img/beautiful-milky-way-in-the-night-sky.jpg'
import { Link } from 'react-router-dom';
import { Path } from '../../Path/Patch';


const WelcomPage: FC = () => {
    return (
        <div className={s.welcom}>
            <img className={s.welcom__img} src={space} alt="space" />
            <div className={s.title}>
                <div className={s.title__item}>
                   <Link className={s.title__link} to={Path.AddPost}>Создай свою Историю</Link> 
                </div>
            </div>

        </div>
    )
}

export default WelcomPage