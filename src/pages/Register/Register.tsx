import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../../components/Header/Header'
import classes from './Register.module.scss'
import eye_off from '../../img/eye_off.svg'
import eye from '../../img/eye.svg'
import { addUser, fetchRegister, itemsAuth, selectIsAuth } from '../../redux/Slice/authSlise';
import {  useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { isArray } from 'util';
import { Navigate } from 'react-router-dom';
import instanse from '../../axios';



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
    const imgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const { items, data } = useSelector(itemsAuth)
    const AuthUser = useSelector(selectIsAuth)
console.log(avatarUrl)


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

    // const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    //     const inputElement = event.target as HTMLInputElement;
    //     const files = inputElement.files;
    //     if (files && files.length > 0) {
    //         // Выбран хотя бы один файл, можно работать с ним
    //         const file = files[0];
    //         // Делаем что-то с файлом
    //         const urlitem = URL.createObjectURL(file)
    //         setImageUrl(urlitem);
    //     } else {

    //         console.log("Файл не выбран");
    //     }
    // };

    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            const file = e.target.files && e.target.files[0]; // Проверка на наличие файлов
            console.log(file)
            if (file) {
                formData.append('image', file);
                const { data } = await instanse.post('/upload', formData);
                setImageUrl(data.url);
                console.log(data.url)
            } else {
                alert('Пожалуйста, выберите файл для загрузки.');
            }
        } catch (error) {
            console.warn(error);
            alert('Ошибка при загрузке файла!');
        }
    };

    const handleRegister = () => {
        const newObj = {
            email,
            password,
            fullName,
        }
        if(avatarUrl !== null){
            Object.assign(newObj, { avatarUrl });
        }

        dispatch(addUser(newObj))

    }



    useEffect(() => {
        dispatch(fetchRegister(items))
    }, [items])

    if ('token' in data) {
        const token = data.token
        window.localStorage.setItem('token', token)
    }


    if (AuthUser) {
    return <Navigate to='/' />
  }
    return (
        <>
            <Header />
            <div className={classes.container}>
                <div className={classes.Form_inner}>
                    <div className={classes.img}>
                        {/* <div onClick={() => handleClickImg()} className={classes.img__items}></div>
                        <input ref={imgRef} type="file" onChange={handleChangeFile} hidden />  */}
                         {
                            avatarUrl ? (
                                <>
                                    <div onClick={onClickRemoveImage}>
                                        Удалить
                                    </div>
                                    <img className={classes.activImg} src={avatarUrl} alt="Uploaded" />
                                </>
                            )
                                :
                                (
                                    <>
                                        <div onClick={() => handleClickImg()} className={classes.img__items}></div>
                                        <input ref={imgRef} type="file" onChange={handleImg} hidden /></>
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
                            value={fullName}
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
                            value={password}
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