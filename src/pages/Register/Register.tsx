import { ChangeEvent, useRef, useState } from 'react';
import Header from '../../components/Header/Header'
import classes from './Register.module.scss'
import eye_off from '../../img/eye_off.svg'
import eye from '../../img/eye.svg'



const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [type, setType] = useState("password")
    const [src, setSrc] = useState(eye_off)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [emailError, setEmailError] = useState('Gmail не может быть пустым')
    const [passError, setPassError] = useState('Пароль не может быть пустым')
    const [imgUrl, setImageUrl] = useState<string>('')
    const imgRef = useRef<HTMLInputElement>(null)


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

    const handleClickImg = () => {
        if (imgRef.current) {
            imgRef.current.click()
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('')
    }

    const handleChangeFile: React.MouseEventHandler<HTMLInputElement> = (event) => {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement.files;
      
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Делаем что-то с файлом
               console.log(file);
            }
        }
    };

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
                                    <img src={`http://localhost:4444${imgUrl}`} alt="Uploaded" />
                                </>
                            )
                        }
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
                        <button className={classes.Form_button} >Отправить</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Register