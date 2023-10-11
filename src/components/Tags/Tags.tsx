import { useSelector, useStore } from 'react-redux';
import { fetchTags, tagsSelector } from '../../redux/Slice/getTags';
import { useAppDispatch } from '../../redux/store';
import s from './Tags.module.scss'
import { FC, useEffect, useState } from 'react';
import { articlesbytag } from '../../redux/Slice/getPostSlise';



const Tags: FC = () => {
    const dispatch = useAppDispatch()
    const data = useSelector(tagsSelector)
    const [tag, setTag] = useState<string>('')
    console.log(tag)

    const tagArrays = data.map((str) => str.split(" "));
    const allTags = tagArrays.flat();
    const uniqueTags = allTags.filter((tag, index, self) => {
        return tag !== "#" && self.indexOf(tag) === index;
    });

    useEffect(() => {
        dispatch(fetchTags())
    }, [fetchTags])
    useEffect(() => {
        if (tag.length > 2) {
            dispatch(articlesbytag({tag}))
        }

    }, [tag])

    const handleClickTag = (tagName: string) => {
        setTag(tagName)
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