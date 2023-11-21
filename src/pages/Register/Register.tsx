import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../../components/Header/Header'
import classes from './Register.module.scss'
import eye_off from '../../img/eye_off.svg'
import eye from '../../img/eye.svg'
import { addUser, fetchRegister, itemsAuth, selectIdError, selectIsAuth } from '../../redux/Slice/authSlise';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import instanse, { REACT_APP_API_URL } from '../../axios';
import avatarZamena from '../../img/user.png';
import avatarDelet from '../../img/-clear_90704.svg'
import bacgroundRegister from '../../img/photodraw.ru-62743.png'



const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [fullName, setName] = useState('')
    const [type, setType] = useState("password")
    const [src, setSrc] = useState(eye_off)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [emailError, setEmailError] = useState('Gmail не может быть пустым')
    const [passError, setPassError] = useState('Пароль не может быть пустым')
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [avatarUrl, setImageUrl] = useState<string>('')
    const [registerError, setRegisterError] = useState<string>('')
    const [bottom, setBottom] = useState<boolean>(false)
    const imgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const { items, data } = useSelector(itemsAuth)
    const AuthUser = useSelector(selectIsAuth)
    const errorRegisater = useSelector(selectIdError)


    useEffect(() => {
        if (errorRegisater.length) {
            const msgValue = errorRegisater[0].msg;
            setRegisterError(msgValue)
        }
    }, [errorRegisater])



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
            case 'name':
                setNameDirty(true)
                break
        }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некоректный gmail')
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

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (e.target.value.length > 1 || e.target.value.length < 1) {
            setNameError('')
            if (!e.target.value) {
                setNameError('Укажите имя')
            }
        } else {
            setNameError('')
        }
    }
    const handleClickImg = () => {
        if (imgRef.current) {
            imgRef.current.click()
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('')
    }


    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            const file = e.target.files && e.target.files[0]; // Проверка на наличие файлов
            if (file) {
                formData.append('image', file);
                const { data } = await instanse.post('/upload', formData);
                setImageUrl(data.url);
            } else {
                alert('Пожалуйста, выберите файл для загрузки.');
            }
        } catch (error) {
            console.warn(error);
            alert('Ошибка при загрузке файла!');
        }
    };
    // const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     try {
    //         const formData = new FormData();
    //         const file = e.target.files && e.target.files[0]; 
    //         if (file) {
    //             formData.append('image', file);
    //             const response = await fetch('https://blog-back-one.vercel.app/upload', {
    //                 method: 'POST',
    //                 body: formData,
    //                 headers: {
    //                     'Access-Control-Allow-Origin': 'https://frontblog-phi.vercel.app' 
    //                 }
    //             });
    //             const { data } = await response.json();
    //             setImageUrl(data.url);
    //         } else {
    //             alert('Пожалуйста, выберите файл для загрузки.');
    //         }
    //     } catch (error) {
    //         console.warn(error);
    //         alert('Ошибка при загрузке файла!');
    //     }
    // };
    const handleRegister = () => {
        const newObj = {
            email,
            password,
            fullName,
        }
        if (avatarUrl !== null) {
            Object.assign(newObj, { avatarUrl });
        }

        dispatch(addUser(newObj))

    }

    const handleScroll = () => {
        setBottom(!bottom)
    }

    useEffect(() => {
        if (items.email.length > 1) {
            dispatch(fetchRegister(items))
        }

    }, [items])

    if (data && 'token' in data) {
        const token = data.token;
        window.localStorage.setItem('token', token);
    }


    if (AuthUser) {
        return <Navigate to='/' />
    }
    return (
        <>
            <div onClick={handleScroll} className={bottom ? `${classes.topScroll} ${classes.bottomScroll}` : classes.topScroll}>
                <Header />
            </div>

            <div className={classes.container}>
                <div className={classes.background}>
                    <img className={classes.background__img} src={bacgroundRegister} alt="bacgroundRegister" />
                </div>
                <div className={classes.Form_inner}>
                    <div className={classes.img}>
                        {
                            avatarUrl ? (
                                <>
                                    <img src={avatarDelet} className={classes.img__delete} onClick={onClickRemoveImage} />
                                    <img className={classes.activImg} src={`${REACT_APP_API_URL}${avatarUrl}`} alt="Uploaded" />
                                </>
                            )
                                :
                                (
                                    <>
                                        <div onClick={() => handleClickImg()} className={classes.img__items}>
                                            <img className={classes.img__zamena} src={avatarZamena} alt="avatarZamena" />
                                        </div>
                                        <input ref={imgRef} type="file" onChange={handleImg} hidden /></>
                                )
                        }
                    </div>
                    <div className={classes.error}>
                        <span className={classes.error__text}>{registerError}</span>
                    </div>
                    <div className={classes.Form_container}>
                        <input
                            name="name"
                            onBlur={(e) => blurHandle(e)}
                            className={classes.Form_email}
                            type='email'
                            value={fullName}
                            onChange={(e) => nameHandler(e)}
                            placeholder=''
                        />
                        <label className={classes.Form_email__label}>Ваше имя</label>
                        {(nameDirty && nameError) && <div className={classes.errorPoppup}>{nameError}</div>}
                    </div>
                    <div className={classes.Form_container}>
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
                        <button className={email.length && password.length >= 6 && fullName.length ? `${classes.Form_button}` : `${classes.Form_button} ${classes.disabled}`}
                            onClick={handleRegister} >Зарегистрироваться</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Register