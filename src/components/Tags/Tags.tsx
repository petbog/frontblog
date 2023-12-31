import { useSelector, useStore } from 'react-redux';
import { fetchTags, tagsSelector, tagsStatusSelector } from '../../redux/Slice/getTags';
import { useAppDispatch } from '../../redux/store';
import s from './Tags.module.scss'
import { FC, useEffect, useState } from 'react';
import { articlesbytag, eyePoppup, getPostSelectorPoppup } from '../../redux/Slice/getPostSlise';
import TagsSkeleton from '../../skeleton/TagsSkeleton';


const Tags: FC = () => {
    const dispatch = useAppDispatch()
    const data = useSelector(tagsSelector)
    const poppup = useSelector(getPostSelectorPoppup)
    const status = useSelector(tagsStatusSelector)
    const [tag, setTag] = useState<string>('')

    useEffect(() => {
    }, [data])
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
            dispatch(articlesbytag({ tag }))
        }

    }, [tag])

    const handleClickTag = (tagName: string) => {
        setTag(tagName)
    }
    const skeleton = [...new Array(3)].map((_, i) => <TagsSkeleton key={i} />)



    const closePoppup = () => {
        dispatch(eyePoppup(false))
    }

    return (
        <div onClick={closePoppup} className={poppup ? `${s.modalWrapper}` : ''}>
            <div className={poppup ? `${s.box}` : `${s.box} ${s.disabled}`} >
                <div className={s.item}>
                    {
                        status === 'loading' ? skeleton : uniqueTags.map((item, index) => (
                            <div
                                onClick={() => handleClickTag(item)}
                                key={index}
                                className={s.item__tags}>{item}</div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Tags