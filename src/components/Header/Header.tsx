import { Link, useLocation } from 'react-router-dom'
import s from './Header.module.scss'

const Header = () => {
    const location = useLocation()
    const isAuth = false

    return (
        <div className={s.header}>
            <div className={s.header_logo}>
                <h3> Blog </h3>
            </div>
            <div className={s.link}>
            {
  location.pathname === '/' ? (
    isAuth ? (
      <>
        <div className={s.link__article}>Написать статью</div>
        <button className={s.link__exid}>Выйти</button>
      </>
    ) : (
      <>
        <Link className={s.innerLinkForward} to='/auth'>
          <div className={s.link__forward}>Войти</div>
        </Link>
        <Link className={s.innerLinkForward} to='/register' >
        <button className={s.link__create}>Создать аккаунт</button>
        </Link>
      </>
    )
  ) : (
    location.pathname === '/register' ? (
      <>
        <Link className={s.innerLinkForward} to='/'>
          <div className={s.link__forward}>На главную</div>
        </Link>
        <Link className={s.innerLinkForward} to='/auth'>
          <div className={s.link__forward}>Войти</div>
        </Link>
      </>
    ) : (
      <>
        <Link className={s.innerLinkForward} to='/'>
          <div className={s.link__forward}>На главную</div>
        </Link>
        <Link to='/register'>
          <button className={s.link__create}>Создать аккаунт</button>
        </Link>
      </>
    )
  )
}

            </div>
        </div>
    )
}

export default Header