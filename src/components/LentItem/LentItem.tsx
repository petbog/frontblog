import { FC } from 'react'
import s from './LentItem.module.scss'
import eye from '../../img/icons8-глаза-учихи-50.png'



type propsType = {
    _id: string,
    createdAt: string,
    imageUrl: string,
    tags: string[],
    title: string,
    viewsCount: number,
}

const LentItem: FC<propsType> = ({ _id, createdAt, imageUrl, tags, title, viewsCount }) => {

    return (
        <div className={s.lent}>
            <div className={s.img}>
                <img className={s.img__items} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
            </div>
            <div className={s.data}>
                <div className={s.data__item}>{createdAt}</div>
            </div>
            <div className={s.title}>
                <div className={s.title__item}>{title}</div>
            </div>
            {tags.map((item) => (
                <div className={s.tags}>
                    <div className={s.tags__item}>{item}</div>
                </div>
            ))}
            <div className={s.viewsCount}>
                <img className={s.viewsCount__img} src={eye} alt="eye" />
                <div className={s.viewsCount__item}>{viewsCount}</div>
            </div>
        </div>
    )
}

export default LentItem