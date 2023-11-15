import s from './Comment.module.scss'
import close from '../../img/-clear_90704.svg'
import { useAppDispatch } from '../../redux/store'
import { commentsType, deleteComment, filterComment, userType } from '../../redux/Slice/onePostsSice'
import { FC, useEffect, useState } from 'react'
import instanse from '../../axios'

type dataUserType = {
    _id: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    imageUrl: string,
    user: {
        avatarUrl: string,
        createdAt: string,
        email: string,
        fullName: string,
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
    // const [dataUser, setDataUser] = useState<dataUserType>({
    //     _id: '',
    //     fullName: '',
    //     email: '',
    //     createdAt: '',
    //     updatedAt: '',
    //     __v: 0,
    //     imageUrl: '',
    //     user: {
    //         avatarUrl: '',
    //         createdAt: '',
    //         email: '',
    //         fullName: '',
    //         passwordHash: '',
    //         updatedAt: '',
    //         __v: 0,
    //         _id: ''
    //     },
    //     viewsCount: 0,
    //     tags: [],
    //     text: '',
    //     title: '',
    //     comments: [],
    // })
    // const { user: { avatarUrl, fullName }, } = dataUser
    const deleteComm = (_id: string) => {
        dispatch(deleteComment(
            _id
        ))
        dispatch(filterComment(_id))
    }


    useEffect(() => {
        const getOnePost = async (post: string) => {
            // const { data } = await instanse.get(`/posts/${post}`)
            const { data } = await instanse.get(`/posts/${post}/comments`)
            // setDataUser(data)
            console.log(data)
        }
        getOnePost(post)
    }, [_id])

    return (
        <div className={s.lentComment}>
            <div className={s.lentComment__container}>
                {/* <div className={s.lentComment__user}>
                    <img className={s.lentComment__img} src={`http://localhost:4444${avatarUrl}`} alt="user_avatar" />
                    <div className={s.lentComment__name}>{fullName}</div>
                </div> */}
                <div key={_id} className={s.lentComment__item}>{text}</div>
                <img onClick={() => { deleteComm(_id) }} src={close} alt="delete" className={s.lentComment__delete} />
            </div>
        </div>
    )
}

export default Comment