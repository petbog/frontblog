import s from './WelcomPage.module.scss'
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../Path/Patch';
import videoBacground from '../../video/DSCF8167_23.mp4'
import backgroundImg from '../../img/1640764795_8-abrakadabra-fun-p-chelovek-so-smartfonom-v-ruke-8.jpg'
import bck from '../../img/bck.jpg'


const WelcomPage: FC = () => {
    return (

        <div className={s.intro}>
            <div className={s.welcom}>
                <img className={s.welcom__img} src={backgroundImg} alt="backgroundImg" />
                <img className={s.welcom__bck} src={bck} alt="backgroundImg" />
                <video
                    className={s.welcom__video}
                    src={videoBacground}
                    autoPlay
                    muted
                    loop
                ></video>
                <div className={s.title}>
                    <div className={s.title__item}>
                        <Link className={s.title__link} to={Path.Register}>Создай свою Историю</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomPage