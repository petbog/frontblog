import s from './Header.module.scss'

const Header = () => {

    const isAuth = false

    return (
        <div className={s.header}>
            <div className={s.header_logo}>
                <h3> Blog </h3>
            </div>
            <div className={s.link}>
                {
                    isAuth ? (<>
                        <button className={s.link__article}>Написать статью</button>
                        <button className={s.link__exid}>Выйти</button>
                    </>) : (<>
                        <div className={s.link__forward}>Войти</div>
                        <button className={s.link__create}>Создать аккаунт</button>
                    </>)
                }

            </div>
        </div>
    )
}

export default Header