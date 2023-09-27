import { FC, useEffect } from 'react'
import s from './OnePost.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { getOnePost, onePostSelector } from '../../redux/Slice/onePostsSice'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'


const OnePost: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { imageUrl, text, tags, title, updatedAt, viewsCount } = useSelector(onePostSelector)


    useEffect(() => {
        dispatch(getOnePost(id))
    }, [])

    return (
        <div  className="">
        <Header />
        <div  className={s.post}>
            <div className={s.img}>
                <img className={s.img__inner} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
            </div>
            <div className={s.create}>
                <div className={s.create__inner}>{updatedAt}</div>
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
                <div className={s.viewsCount__inner}> {viewsCount}</div>
            </div>

        </div>
    </div >

    )
}


export default OnePost