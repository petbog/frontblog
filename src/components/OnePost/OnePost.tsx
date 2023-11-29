import { FC, useEffect, useState } from 'react'
import s from './OnePost.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { createComment, getOnePost, onePostSelector } from '../../redux/Slice/onePostsSice'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'
import preloader from '../../img/infinite-spinner.svg'
import Comment from '../Comment/Comment'
import { selectIdUser } from '../../redux/Slice/authSlise'

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { REACT_APP_API_URL } from '../../axios'



const OnePost: FC = () => {

    const dispatch = useAppDispatch()
    const userId = useSelector(selectIdUser)
    const [openComment, setOpenComment] = useState<Boolean>(false)
    const [textareaValue, setTextareaValue] = useState<string>("")
    const [data, setData] = useState<{ postId: string | undefined, comment: string, userId: string }>({
        postId: '',
        comment: '',
        userId
    })
    const { id } = useParams<{ id: string }>()
    const { imageUrl, text, tags, title, updatedAt, viewsCount, user: { avatarUrl, fullName, _id }, comments } = useSelector(onePostSelector)

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
            comment: textareaValue,
            userId: userId
        })
    }, [id, textareaValue, userId])

    const sendComment = () => {
        dispatch(createComment(data))
        clearText()
    }

    const handlecreateComment = () => {
        setOpenComment(!openComment)
        window.scrollTo(0, document.body.scrollHeight)
    }
    if (!imageUrl) {
        return <img src={preloader} alt="preloader" className={s.preloader} />
    }
    return (
        <div className={s.innerPost}>
            <Header />
            <div className={s.post}>
                <div className={s.img}>
                    <img className={s.img__inner} src={`${REACT_APP_API_URL}${imageUrl}`} alt="imageUrl" />
                </div>
                <div className={s.user}>
                    <img className={s.user__avatar} src={`${REACT_APP_API_URL}${avatarUrl}`} alt="" />
                    <div className={s.user__name}>{fullName}</div>
                </div>
                <div className={s.create}>
                    <div className={s.create__inner}>{formattedDate}</div>
                </div>
                <div className={s.title}>
                    <div className={s.title__inner}>{title}</div>
                </div>
                {tags.map((item, i) => (
                    <div key={i} className={s.tags}>
                        <div className={s.tags__inner}>{item}</div>
                    </div>
                ))}
                <div className={s.text}>
                    <div className={s.text__inner}>{text}</div>
                </div>
                <div className={s.viewsCount}>
                    {
                        <svg className={s.viewsCount__img} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            width="800px" height="800px" viewBox="0 0 442.04 442.04"
                        >
                            <g>
                                <g>
                                    <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
                c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
                c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
                c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
                c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
                c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
                c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"/>
                                </g>
                                <g>
                                    <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
                c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
                c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
                s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"/>
                                </g>
                                <g>
                                    <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />
                                </g>
                            </g>
                        </svg>
                    }
                    <div className={s.viewsCount__inner}> {viewsCount}</div>
                    {
                        <svg onClick={handlecreateComment} className={s.commentImg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V18V21L6.46667 18.4C6.81286 18.1404 7.23393 18 7.66667 18H19C20.1046 18 21 17.1046 21 16V6C21 4.89543 20.1046 4 19 4Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
                    }
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
                            {
                                <svg className={s.comment__img} onClick={clearText}  viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            }
                            {
                                <svg className={s.comment__imgSend} onClick={sendComment} viewBox="0 0 24 24" ><path d="M6.48 6.794l.49 1.963a1 1 0 0 1-1.94.486l-1-4a1 1 0 0 1 1.393-1.15l15 7a1 1 0 0 1 0 1.813l-15 7a1 1 0 0 1-1.385-1.18l2-7A1 1 0 0 1 7 11h4a1 1 0 0 1 0 2H7.754l-1.19 4.167L17.635 12 6.48 6.794z" fill-rule="nonzero"/></svg>
                            }
                        </>
                        : ''}
                </div> : ''
            }
            <div className={s.lentComment}>
                <TransitionGroup>
                    {
                        [...comments].reverse().map((item) =>
                            <CSSTransition classNames="item" timeout={500} key={item._id}>
                                <Comment  {...item} />
                            </CSSTransition>)
                    }
                </TransitionGroup>
            </div>

        </div >

    )
}


export default OnePost