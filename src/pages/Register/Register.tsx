import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../../components/Header/Header'
import classes from './Register.module.scss'
import eye_off from '../../img/eye_off.svg'
import eye from '../../img/eye.svg'
import { addUser, fetchRegister } from '../../redux/Slice/authSlise';
import { useAppDispatch } from '../../redux/store';



const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [obj, setObj] = useState({
        email,
        pass,
        name
    })
    const [type, setType] = useState("password")
    const [src, setSrc] = useState(eye_off)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [emailError, setEmailError] = useState('Gmail не может быть пустым')
    const [passError, setPassError] = useState('Пароль не может быть пустым')
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [imgUrl, setImageUrl] = useState<File | null>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()


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
        setImageUrl(null)
    }

    const handleChangeFile: React.MouseEventHandler<HTMLInputElement> = async (event) => {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement.files;
        if (files && files.length > 0) {
            // Выбран хотя бы один файл, можно работать с ним
            const file = files[0];
            // Делаем что-то с файлом
            await setImageUrl(file);
        } else {

            console.log("Файл не выбран");
        }
    };

    const handleRegister = () => {
        setObj({
            email,
            pass,
            name
        })
        dispatch(addUser(obj))

    }



    // useEffect(() => {
    //     dispatch(fetchRegister(obj))

    // }, [])
    return (
        <>
            <Header />
            <div className={classes.container}>
                <div className={classes.Form_inner}>
                    <div className={classes.img}>
                        <div onClick={() => handleClickImg()} className={classes.img__items}></div>
                        <input ref={imgRef} type="file" onClick={handleChangeFile} hidden />
                        {
                            imgUrl && (
                                <>
                                    <div onClick={onClickRemoveImage}>
                                        Удалить
                                    </div>
                                    {/* <img src={imgUrl} alt="Uploaded" /> */}
                                </>
                            )
                        }
                    </div>
                    <div className={classes.Form_container}>
                        <p className={classes.form_title}>Имя</p>
                        <input
                            name="name"
                            onBlur={(e) => blurHandle(e)}
                            className={classes.Form_email}
                            type='email'
                            value={name}
                            onChange={(e) => nameHandler(e)}
                            placeholder=''
                        />
                        <label className={classes.Form_email__label}>Ваше имя</label>
                        {(nameDirty && nameError) && <div className={classes.errorPoppup}>{nameError}</div>}
                    </div>
                    <div className={classes.Form_container}>
                        <p className={classes.form_title}>Логин</p>
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
                            value={pass}
                            onChange={(e) => passwordHandler(e)}
                            placeholder=''
                        />
                        <label className={classes.Form_pass__label}>Введите password</label>
                        {(passDirty && passError) && <div className={classes.errorPoppup}>{passError}</div>}
                        <img onClick={handleToggle} className={classes.form_img} src={src} alt="" />
                    </div>
                    <div className={classes.Button_container}>
                        <button className={classes.Form_button} onClick={handleRegister} >Отправить</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Register