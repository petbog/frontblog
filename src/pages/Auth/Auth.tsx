import classes from "./Auth.module.scss"
import Header from "../../components/Header/Header"
import { useEffect, useState } from 'react';
import eye_off from '../../img/eye_off.svg'
import eye from '../../img/eye.svg'
import { useAppDispatch } from "../../redux/store";
import { fetchLogin, itemsAuth, selectIsAuth } from "../../redux/Slice/authSlise";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [dateObj, setDateObj] = useState({
        email,
        password
    })
    const [type, setType] = useState("password")
    const [src, setSrc] = useState(eye_off)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passError, setPassError] = useState('Пароль не может быть пустым')

    const dispatch = useAppDispatch()
    const authUser = useSelector(selectIsAuth)
    const { data } = useSelector(itemsAuth)

    const handleToggle = () => {
        if (type === "password") {
            setType("text")
            setSrc(eye)
        } else {
            setType("password")
            setSrc(eye_off)
        }
    }

    const blurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPassDirty(true)
                break
        }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некоректный email')
        } else {
            setEmailError('')
        }

    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value)
        if (e.target.value.length < 6 || e.target.value.length > 9) {
            setPassError('Пароль должен состоять от 6 до 8 символов')
            if (!e.target.value) {
                setPassError('Пароль должен состоять от 6 до 8 символов')
            }
        } else {
            setPassError('')
        }
    }
    useEffect(() => {
        setDateObj({
            email,
            password
        })
    }, [email, password])

    const handleLogin = async () => {
        dispatch(fetchLogin(dateObj))


    }
       if ('token' in data) {
            const token = data.token
            window.localStorage.setItem('token', token)
        }

    if (authUser) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Header />
            <div className={classes.container}>
                <div className={classes.Form_inner}>
                    <div className={classes.Form_container}>
                        <p className={classes.form_title}>Почта</p>
                        <input
                            name="email"
                            onBlur={(e) => blurHandle(e)}
                            className={classes.Form_email}
                            type='email'
                            value={email}
                            onChange={(e) => emailHandler(e)}
                            placeholder=''
                        />
                        <label className={classes.Form_email__label}>Введите email</label>
                        {(emailDirty && emailError) && <div className={classes.errorPoppup}>{emailError}</div>}
                    </div>
                    <div className={classes.Form_container_pass}>
                        <p className={classes.form_title}>Пароль</p>
                        <input
                            name="password"
                            onBlur={(e) => blurHandle(e)}
                            className={classes.Form_pass}
                            type={type}
                            value={password}
                            onChange={(e) => passwordHandler(e)}
                            placeholder=''
                        />
                        <label className={classes.Form_pass__label}>Введите password</label>
                        {(passDirty && passError) && <div className={classes.errorPoppup}>{passError}</div>}
                        <img onClick={handleToggle} className={classes.form_img} src={src} alt="" />
                    </div>
                    <div className={classes.Button_container}>
                        <button onClick={handleLogin} className={classes.Form_button} >Отправить</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Auth