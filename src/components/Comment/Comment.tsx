import s from './Comment.module.scss'
import close from '../../img/-clear_90704.svg'
import { useAppDispatch } from '../../redux/store'
import { commentsType, deleteComment, filterComment } from '../../redux/Slice/onePostsSice'
import { FC, useCallback, useEffect } from 'react'
import instanse from '../../axios'


const Comment: FC<commentsType> = ({ text, _id, post }) => {
    const dispatch = useAppDispatch()
    const deleteComm = (_id: string) => {
        dispatch(deleteComment(
            _id
        ))
        dispatch(filterComment(_id))
    }



    useEffect(() => {
        const getOnePost = async (post: string) => {
            const { data } = await instanse.get(`/posts/${post}`)
            console.log(data)
            return data
        }
        getOnePost(post)
    }, [_id])

    return (
        <div className={s.lentComment}>
            <div className={s.lentComment__container}>
                <div key={_id} className={s.lentComment__item}>{text}</div>
                <img onClick={() => { deleteComm(_id) }} src={close} alt="delete" className={s.lentComment__delete} />
            </div>
        </div>
    )
}

export default Comment