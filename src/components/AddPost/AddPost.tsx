import s from './addPost.module.scss'
import Header from '../Header/Header'
import { useRef, useState } from 'react'

const AddPost = () => {

    const getFile = useRef<HTMLInputElement>(null)
    const [text, setText] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');

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

    return (
        <div className="">
            <Header />
            <div className={s.addpost}>
                <div className={s.button}>
                    <input ref={getFile} className={s.button__input} type="file" hidden />
                    <div onClick={handleFile} className={s.button__inner}>Загрузить превью</div>
                </div>
                <div className={s.title}>
                    <input className={s.title__inner} type="text" placeholder='Заголовок статьи...' />
                </div>
                <div className={s.tags}>
                    <input className={s.tags__inner} type="text" placeholder='# Тэги' />
                </div>
                <div className={s.text}>
                    <textarea style={{ height: textareaHeight }}
                        value={text}
                        onChange={handleChange}
                        className={s.text__inner}
                        placeholder='Введите текст...' />
                </div>
                <div className={s.submit}>
                    <div className={s.submit__button}>Сохранить статью</div>
                </div>
            </div>
        </div>
    )
}


export default AddPost