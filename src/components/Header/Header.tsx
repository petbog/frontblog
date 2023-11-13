import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, selectIsAuth } from '../../redux/Slice/authSlise'
import { Path } from '../../Path/Patch'
import arrow from '../../img/1492533558-slideupdown_83272.svg'
import blogSvg from '../../img/blogsvg.svg'
import email from '../../img/email-envelope-outline-shape-with-rounded-corners_icon-icons.com_56530.svg'

const Header: React.FC = () => {
  const authUser = useSelector(selectIsAuth)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const exaedUser = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(removeUser())
      window.localStorage.removeItem('token')
      navigate(Path.WelcomPage)
    }
  }

  return (
    <div className={s.header}>
      <Link className={s.innerLinkForward} to={Path.Home}>
        <div className={s.header_logo}>
          <img src={blogSvg} alt="blogSvg" />
          <img className={s.header__email} src={email} alt="email" />
        </div>

      </Link>

      <div className={s.link}>
        {
          location.pathname === '/' ? (
            authUser ? (
              <>
                <Link to={Path.AddPost} className={`${s.link__article} ${s.disabel}`}>Написать статью</Link>
                <Link to={Path.AddPost} className={`${s.link__article} ${s.unsisabel}`}>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 512 512" >
                    <g>
                      <path d="M448,64H64C28.656,64,0,92.656,0,128v256c0,35.344,28.656,64,64,64h384c35.344,0,64-28.656,64-64V128
		C512,92.656,483.344,64,448,64z M342.656,234.781l135.469-116.094c0.938,3,1.875,6,1.875,9.313v256
		c0,2.219-0.844,4.188-1.281,6.281L342.656,234.781z M448,96c2.125,0,4,0.813,6,1.219L256,266.938L58,97.219
		C60,96.813,61.875,96,64,96H448z M33.266,390.25C32.828,388.156,32,386.219,32,384V128c0-3.313,0.953-6.313,1.891-9.313
		L169.313,234.75L33.266,390.25z M64,416c-3.234,0-6.172-0.938-9.125-1.844l138.75-158.563l51.969,44.531
		C248.578,302.719,252.297,304,256,304s7.422-1.281,10.406-3.875l51.969-44.531l138.75,158.563C454.188,415.062,451.25,416,448,416
		H64z" fill="white" />
                    </g>
                  </svg>
                </Link>
                <div onClick={exaedUser} className={`${s.link__exid} ${s.disabel}`}>Выйти</div>

                <div onClick={exaedUser} className={`${s.link__exid} ${s.unsisabel}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="red" d="M14,17 L16,17 L16,18 C16,19.6568542 14.6568542,21 13,21 L5,21 C3.34314575,21 2,19.6568542 2,18 L2,6 C2,4.34314575 3.34314575,3 5,3 L13,3 C14.6568542,3 16,4.34314575 16,6 L16,7 L14,7 L14,6 C14,5.44771525 13.5522847,5 13,5 L5,5 C4.44771525,5 4,5.44771525 4,6 L4,18 C4,18.5522847 4.44771525,19 5,19 L13,19 C13.5522847,19 14,18.5522847 14,18 L14,17 Z M18.0472731,10.9551845 L16.8895461,9.78361162 C16.4863425,9.37558579 16.4863425,8.71404521 16.8895461,8.30601937 C17.2927498,7.89799354 17.9464721,7.89799354 18.3496758,8.30601937 L22,12 L18.3496758,15.6939806 C17.9464721,16.1020065 17.2927498,16.1020065 16.8895461,15.6939806 C16.4863425,15.2859548 16.4863425,14.6244142 16.8895461,14.2163884 L18.0472731,13.0448155 L11.0324676,13.0448155 C10.4622515,13.0448155 10,12.5770357 10,12 C10,11.4229643 10.4622515 10.9551845 11.0324676,10.9551845 L18.0472731,10.9551845 Z" />
                  </svg>

                </div>
              </>
            ) : (
              <>
                <Link className={s.innerLinkForward} to={Path.Auth}>
                  <div className={s.link__forward}>Войти</div>
                </Link>
              </>
            )
          ) : (
            location.pathname === '/register' ? (
              <>
                <Link className={s.innerLinkForward} to={Path.Home}>
                  <div className={`${s.hidden} ${s.homePage}`}>На главную</div>
                </Link>
                <Link className={s.innerLinkForward} to={Path.Auth}>
                  <div className={s.link__forward}>Войти</div>
                </Link>
              </>
            ) : (
              location.pathname === '/addPost' ? (
                <>
                  <>
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
      {location.pathname === Path.Register || location.pathname === Path.Auth ? <div className={s.language}>
        <img className={s.language__arrow} src={arrow} alt="arrow" />
      </div> : ''}
    </div>
  )
}


export default Header