import { FC, useEffect, useState } from 'react'
import s from './OnePost.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { createComment, getOnePost, onePostSelector } from '../../redux/Slice/onePostsSice'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'
import eye from '../../img/eye-svgrepo-com.svg'
import comment from '../../img/comment-line-svgrepo-com.svg'
import close from '../../img/-clear_90704.svg'
import send from '../../img/send_121135.svg'
import preloader from '../../img/preloader.gif'
import Comment from '../Comment/Comment'



const OnePost: FC = () => {

    const dispatch = useAppDispatch()
    const [openComment, setOpenComment] = useState<Boolean>(false)
    const [textareaValue, setTextareaValue] = useState<string>("")
    const [data, setData] = useState<{ postId: string | undefined, comment: string }>({
        postId: '',
        comment: ''
    })
    const { id } = useParams<{ id: string }>()
    const { imageUrl, text, tags, title, updatedAt, viewsCount, user: { avatarUrl, fullName }, comments } = useSelector(onePostSelector)


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

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value)
    }
    const clearText = () => {
        setTextareaValue('')
    }

    useEffect(() => {
        setData({
            postId: id,
            comment: textareaValue
        })
    }, [id, textareaValue])

    const sendComment = () => {
        dispatch(createComment(data))
        clearText()
    }

    const handlecreateComment = () => {
        setOpenComment(!openComment)
        window.scrollTo(0, document.body.scrollHeight)
    }
    // const deleteComm = (_id: string) => {
    //     dispatch(deleteComment(
    //         _id
    //     ))
    //     dispatch(filterComment(_id))
    // }
    return (
        <div className={s.innerPost}>
            <Header />
            <div className={s.post}>
                <div className={s.img}>
                    {
                        !imageUrl ? <img src={preloader} alt="preloader" className={s.preloader} /> : <img className={s.img__inner} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
                    }

                </div>
                <div className={s.user}>
                    {
                        !imageUrl ? <img src={preloader} alt="preloader" className={s.preloader} /> : <img className={s.user__avatar} src={`http://localhost:4444${avatarUrl}`} alt="" />
                    }

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
                    <img onClick={handlecreateComment} className={s.commentImg} src={comment} alt="comment" />
                    <div className={s.viewsCount__length}>{comments.length}</div>
                </div>
            </div>

            {
                openComment ? <div className={s.comment}>
                    <textarea
                        value={textareaValue}
                        onChange={handleText}
                        placeholder='Ваш комментарий...'
                        className={s.comment__text} />
                    {textareaValue.length > 1 ?
                        <>
                            <img className={s.comment__img} onClick={clearText} src={close} alt="close" />
                            <img className={s.comment__imgSend} onClick={sendComment} src={send} alt="send" />
                        </>
                        : ''}
                </div> : ''
            }
            <div className={s.lentComment}>
                {
                    [...comments].reverse().map((item) => <Comment key={item._id} {...item} />)
                }
            </div>
        </div >

    )
}


export default OnePost