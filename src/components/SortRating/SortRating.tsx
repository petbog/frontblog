import { eyePoppup, newSortPost, populatePost } from '../../redux/Slice/getPostSlise';
import { useAppDispatch } from '../../redux/store';
import s from './SortRating.module.scss'
import { useEffect, useState } from 'react';
import hachtag from '../../img/hashtag_icon_199096.svg'
import Tags from '../Tags/Tags';

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
        dispatch(eyePoppup(poppup))
    }
    useEffect(() => {
        dispatch(eyePoppup(poppup))
    }, [dispatch, poppup])
    return (
        <div className={s.rating}>
            <div className={s.button}>
                <div onClick={handkeNewPost} className={`${s.button__inner} ${newPost ? s.activ : ''}`}>Новые</div>
            </div>
            <div className={s.button}>
                <div className={`${s.button__inner} ${populate ? s.activ : ''}`} onClick={handleRating}>Популярные</div>
            </div>
            <div className={`${s.hachtag} ${s.disabel}`}>
                <img onClick={handleHach}
                    className={`${s.hachtag__img} ${hach ? s.activ : ''}`}
                    src={hachtag}
                    alt="hachtag" />
            </div>
        </div>
    )
}


export default SortRating