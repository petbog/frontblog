import { Link, useLocation } from 'react-router-dom'
import s from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, selectIsAuth } from '../../redux/Slice/authSlise'
import { Path } from '../../Path/Patch'

const Header = () => {
  const authUser = useSelector(selectIsAuth)
  const location = useLocation()
  const dispatch = useDispatch()

  const exaedUser = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(removeUser())
      window.localStorage.removeItem('token')
    }
  }

  return (
    <div className={s.header}>
      <Link className={s.innerLinkForward} to={Path.Home}>
        <div className={s.header_logo}>
          <h3> Blog </h3>
        </div>

      </Link>

      <div className={s.link}>
      {
  location.pathname === '/' ? (
    authUser ? (
      <>
        <Link to={Path.AddPost} className={s.link__article}>Написать статью</Link>
        <div onClick={exaedUser} className={s.link__exid}>Выйти</div>
      </>
    ) : (
      <>
        <Link className={s.innerLinkForward} to={Path.Auth}>
          <div className={s.link__forward}>Войти</div>
        </Link>
        <Link className={s.innerLinkForward} to={Path.Register}>
          <button className={s.link__create}>Создать аккаунт</button>
        </Link>
      </>
    )
  ) : (
    location.pathname === '/register' ? (
      <>
        <Link className={s.innerLinkForward} to={Path.Home}>
          <div className={s.link__forward}>На главную</div>
        </Link>
        <Link className={s.innerLinkForward} to={Path.Auth}>
          <div className={s.link__forward}>Войти</div>
        </Link>
      </>
    ) : (
      location.pathname === '/addPost' ? (
        <>
          <>
          <Link className={s.hidden} to={Path.Register}>
            <button className={s.link__create}>Создать аккаунт</button>
          </Link>
          <Link className={s.innerLinkForward} to={Path.Home}>
            <div className={s.link__forward}>На главную</div>
          </Link>
        </>
        </>
      ) : (
        <></>
      )
    )
  )
}

      </div>
    </div>
  )
}


export default Header