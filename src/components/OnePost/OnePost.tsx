import { FC, useEffect, useState } from 'react'
import s from './OnePost.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { getOnePost, onePostSelector } from '../../redux/Slice/onePostsSice'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'
import eye from '../../img/Без названия.png'


const OnePost: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { imageUrl, text, tags, title, updatedAt, viewsCount,user:{avatarUrl,fullName} } = useSelector(onePostSelector)


    useEffect(() => {
        dispatch(getOnePost(id))
    }, [])
    const dateObject = new Date(updatedAt);

    // Используйте методы объекта Date для получения отдельных компонентов времени
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы начинаются с 0
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
  
    // Форматируйте дату и время в нужный формат
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return (
        <div  className="">
        <Header />
        <div  className={s.post}>
            <div className={s.img}>
                <img className={s.img__inner} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
            </div>
            <div className={s.user}>
                <img className={s.user__avatar} src={`http://localhost:4444${avatarUrl}`} alt="" />
                <div className={s.user__name}>{fullName}</div>
            </div>
            <div className={s.create}>
                <div className={s.create__inner}>{formattedDate}</div>
            </div>
            <div className={s.title}>
                <div className={s.title__inner}>{title}</div>
            </div>
            {tags.map(item => (
                <div className={s.tags}>
                    <div className={s.tags__inner}>{item}</div>
                </div>
            ))}
            <div className={s.text}>
                <div className={s.text__inner}>{text}</div>
            </div>
            <div className={s.viewsCount}>
                <img className={s.viewsCount__img} src={eye} alt="" />
                <div className={s.viewsCount__inner}> {viewsCount}</div>
            </div>

        </div>
    </div >

    )
}


export default OnePost