import { useSelector } from 'react-redux';
import { fetchTags, tagsSelector } from '../../redux/Slice/getTags';
import { useAppDispatch } from '../../redux/store';
import s from './Tags.module.scss'
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Tags: FC = () => {
    const dispatch = useAppDispatch()
    const data = useSelector(tagsSelector)
    const tagArrays = data.map((str) => str.split(" "));
    const allTags = tagArrays.flat();
    const uniqueTags = allTags.filter((tag, index, self) => {
        return tag !== "#" && self.indexOf(tag) === index;
    });

    useEffect(() => {
        dispatch(fetchTags())
    }, [fetchTags])

    const handleClickTag = (tagName: string) => {
        console.log(tagName)
    }

    return (
        <div className={s.box}>
            <div className={s.item}>
                {
                    uniqueTags.map((item, index) => (
                        <div
                            onClick={() => handleClickTag(item)}
                            key={index}
                            className={s.item__tags}>{item}</div>
                    ))
                }
            </div>
        </div>
    )
}


export default Tags