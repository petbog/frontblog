import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, selectIsAuth } from '../../redux/Slice/authSlise'
import { Path } from '../../Path/Patch'
import arrow from '../../img/1492533558-slideupdown_83272.svg'

const Header: React.FC = () => {
  const authUser = useSelector(selectIsAuth)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const exaedUser = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(removeUser())
      window.localStorage.removeItem('token')
    }
    navigate(Path.WelcomPage)
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
      <div className={s.language}>
        <img className={s.language__arrow} src={arrow} alt="arrow" />
      </div>
    </div>
  )
}


export default Header