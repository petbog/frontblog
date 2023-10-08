import {  newSortPost, populatePost } from '../../redux/Slice/getPostSlise';
import { useAppDispatch } from '../../redux/store';
import s from './SortRating.module.scss'
import { useState } from 'react';

const SortRating = () => {
    const dispatch = useAppDispatch()

    const [newPost, setNewPost] = useState(false)
    const [populate, setPopulate] = useState(true)
    

    const handleRating = () => {
        dispatch(populatePost())
        setNewPost(false)
        setPopulate(true)
    }
    const handkeNewPost = () => {
        dispatch(newSortPost())
        setNewPost(true)
        setPopulate(false)
    }

    return (
        <div className={s.rating}>
            <div className={s.button}>
                <div onClick={handkeNewPost} className={`${s.button__inner} ${newPost ? s.activ : ''}`}>Новые</div>
            </div>
            <div className={s.button}>
                <div className={`${s.button__inner} ${populate ? s.activ : ''}`} onClick={handleRating}>Популярные</div>
            </div>
        </div>
    )
}


export default SortRating