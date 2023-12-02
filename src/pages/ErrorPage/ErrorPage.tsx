import { Link } from 'react-router-dom'
import { Path } from '../../Path/Patch'
import s from './ErrorPage.module.scss'
import ButtonTheme from '../../components/ButtonTheme/ButtonTheme'

const ErrorPage = () => {
    return (
        <div className={s.error}>
            <div className={s.error__box}>
                <div className={s.error__title}>Такой страницы нет</div>
                <Link className={s.error__link} to={Path.Home}>
                    <div className={s.error__button}>
                        Назад
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage