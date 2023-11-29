import { eyePoppup, newSortPost, populatePost } from '../../redux/Slice/getPostSlise';
import { useAppDispatch } from '../../redux/store';
import s from './SortRating.module.scss'
import { useState } from 'react';



const SortRating = () => {
    const dispatch = useAppDispatch()

    const [newPost, setNewPost] = useState<boolean>(false)
    const [hach, setHach] = useState<boolean>(false)
    const [populate, setPopulate] = useState<boolean>(true)
    const [poppup, setPoppup] = useState<boolean>(false)


    const handleRating = () => {
        dispatch(populatePost())
        setNewPost(false)
        setPopulate(true)
        setHach(false)
    }
    const handkeNewPost = () => {
        dispatch(newSortPost())
        setNewPost(true)
        setPopulate(false)
        setHach(false)
    }

    const handleHach = () => {
        setHach(true)
        setNewPost(false)
        setPopulate(false)
        setPoppup(!poppup)
        dispatch(eyePoppup(true))
    }

    return (
        <div className={s.rating}>
            <div className={s.button}>
                <div onClick={handkeNewPost} className={`${s.button__inner} ${newPost ? s.activ : ''}`}>Новые</div>
            </div>
            <div className={s.button}>
                <div className={`${s.button__inner} ${populate ? s.activ : ''}`} onClick={handleRating}>Популярные</div>
            </div>
            <div className={`${s.hachtag} ${s.disabel}`}>
                    {
                        <svg onClick={handleHach}
                        className={`${s.hachtag__img} ${hach ? s.activ : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 127.1h-58.23l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L292.9 127.1H197.8l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L132.9 127.1H64c-17.67 0-32 14.33-32 32C32 177.7 46.33 191.1 64 191.1h58.23l-21.33 128H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 31.1 32 31.1h58.23l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C108.5 479.9 110.3 480 112 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27h95.12l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C268.5 479.9 270.3 480 272 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27H384c17.67 0 32-14.33 32-31.1c0-17.67-14.33-32-32-32h-58.23l21.33-128H416c17.67 0 32-14.32 32-31.1C448 142.3 433.7 127.1 416 127.1zM260.9 319.1H165.8L187.1 191.1h95.12L260.9 319.1z"/></svg>
                    }
            </div>
        </div>
    )
}


export default SortRating