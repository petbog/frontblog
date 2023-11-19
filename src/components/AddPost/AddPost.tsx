import s from './addPost.module.scss'
import Header from '../Header/Header'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { RemovePost, addPost } from '../../redux/Slice/postSise'
import instanse from '../../axios'

import { useNavigate, useParams } from 'react-router-dom'
import { Path } from '../../Path/Patch'
import { fetchMe } from '../../redux/Slice/authSlise'
import { getOnePost, onePostSelector } from '../../redux/Slice/onePostsSice'
import { useSelector } from 'react-redux'

const AddPost: FC = () => {
    const navigate = useNavigate()
    const getFile = useRef<HTMLInputElement>(null)
    const [text, setText] = useState<string>('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [title, setTitle] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const [obj, setObj] = useState({
        title,
        tags,
        text,
        imageUrl
    })
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const removeTodo = Boolean(id)
    const data = useSelector(onePostSelector)

    useEffect(() => {
        dispatch(getOnePost(id))
    }, [id])

    useEffect(() => {
        data && setText(data.text)
        data && setTitle(data.title)
        data && setTags(data.tags.join())
        data && setImageUrl(data.imageUrl)
    }, [data])
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaLineHeight = 24; // Задайте высоту строки вашего текста
        const minRows = 2; // Минимальное количество строк
        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

        setText(e.target.value);

        setTextareaHeight(
            currentRows < minRows ? 'auto' : `${currentRows}em`
        );
    };

    const handleFile = () => {
        if (getFile.current) {
            getFile.current.click()
        }
    }

    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            const file = e.target.files && e.target.files[0]; // Проверка на наличие файлов
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

    const modifiedTags = tags
        .split(' ')
        .map((word) => {
            if (!word.startsWith("#") && word.trim() !== '') {
                return `#${word}`;
            } else {
                return word;
            }
        })
        .join(' ');


    useEffect(() => {
        setObj({
            title,
            tags: modifiedTags,
            text,
            imageUrl
        })
    }, [title, tags, text, imageUrl])

    const handleAddPost = () => {
        if (removeTodo) {
            dispatch(RemovePost({
                params: obj,
                _id: id
            }))
            navigate(Path.Home)
            dispatch(fetchMe())
        } else {
            dispatch(addPost(obj))
            navigate(Path.Home)
            dispatch(fetchMe())
        }

    }
    const remuveImg = () => {
        setImageUrl('')
    }

    return (
        <div className="">
            <Header />
            <div className={s.addpost}>

                {
                    !imageUrl ? (
                        <div className={s.button}>
                            <input onChange={handleImg} ref={getFile} className={s.button__input} type="file" hidden />
                            <div onClick={handleFile} className={s.button__inner}>Загрузить превью</div>
                        </div>
                    ) : (
                        <>
                            <div className={s.remove}>
                                <div onClick={remuveImg} className={s.remove__inner}>Удалить превью</div>
                            </div>
                            <div className={s.img}>
                                <img className={s.img__inner} src={`MONGODB_URL${imageUrl}`} alt="imageUrl" />
                            </div>
                        </>

                    )
                }
                <div className={s.title}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={s.title__inner} type="text" placeholder='Заголовок статьи...' />
                </div>
                <div className={s.tags}>
                    <input value={tags} onChange={(e) => setTags(e.target.value)} className={s.tags__inner} type="text" placeholder='# Тэги' />
                </div>
                <div className={s.text}>
                    <textarea style={{ height: textareaHeight }}
                        value={text}
                        onChange={handleChange}
                        className={s.text__inner}
                        placeholder='Введите текст...' />
                </div>
                <div className={s.submit}>
                    {
                        removeTodo ? <div onClick={handleAddPost} className={s.submit__button}>Редактировать статью</div> :
                            <div onClick={handleAddPost} className={s.submit__button}>Сохранить статью</div>
                    }

                </div>
            </div>
        </div>
    )
}


export default AddPost