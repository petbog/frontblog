import s from './Comment.module.scss'
import { useAppDispatch } from '../../redux/store'
import { commentsType, deleteComment, filterComment, onePostSelector } from '../../redux/Slice/onePostsSice'
import { FC, useEffect, useState } from 'react'
import instanse from '../../axios'
import userZamena from '../../img/user.png'
import { useSelector } from 'react-redux'
import { selectIdUser } from '../../redux/Slice/authSlise'

type dataUserType = {
    _id: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    imageUrl: string,
    user: {
        avatarUrl: string | undefined,
        createdAt: string,
        email: string,
        fullName: string | undefined,
        passwordHash: string,
        updatedAt: string,
        __v: number,
        _id: string
    },
    viewsCount: number,
    tags: string[],
    text: string,
    title: string,
    comments: string[],
}


const Comment: FC<commentsType> = ({ text, _id, post }) => {

    const dispatch = useAppDispatch()
    const { user: { _id: userAuthId } } = useSelector(onePostSelector)
    const userId = useSelector(selectIdUser)
    const [dataUser, setDataUser] = useState<dataUserType[]>([{
        _id: '',
        fullName: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        imageUrl: '',
        user: {
            avatarUrl: '',
            createdAt: '',
            email: '',
            fullName: '',
            passwordHash: '',
            updatedAt: '',
            __v: 0,
            _id: ''
        },
        viewsCount: 0,
        tags: [],
        text: '',
        title: '',
        comments: [],
    }])
    const deleteComm = (_id: string) => {
        dispatch(deleteComment(
            _id
        ))
        dispatch(filterComment(_id))
    }


    useEffect(() => {
        const getOnePost = async (post: string) => {
            const { data } = await instanse.get(`/posts/${post}/comments`)
            setDataUser(data)
        }
        getOnePost(post)
    }, [_id])

    const foundObject = dataUser.find(item => item.text === text)
    const avatarUrl = foundObject ? foundObject.user.avatarUrl : '';
    const idPost = foundObject ? foundObject.user._id : '';
    const fullName = foundObject ? foundObject.user.fullName : '';

    return (
        <div className={s.lentComment}>
            <div className={s.lentComment__container}>
                <div className={s.lentComment__user}>
                    {
                        avatarUrl === '' ? <img className={s.lentComment__img} src={userZamena} alt="userZamena" /> : <img className={s.lentComment__img} src={`REACT_APP_API_URL${avatarUrl}`} alt="user_avatar" />}
                    <div className={s.lentComment__name}>{fullName}</div>
                </div>
                <div key={_id} className={s.lentComment__item}>{text}</div>
                {

                    userId === userAuthId || userId === idPost ? <div onClick={() => { deleteComm(_id) }} className={s.lentComment__delete} >
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                        }
                    </div>
                        : ''
                }
            </div>
        </div>
    )
}

export default Comment