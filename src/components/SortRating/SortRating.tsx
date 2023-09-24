import s from './SortRating.module.scss'

const SortRating = () => {
    return (
        <div className={s.rating}>
            <div className={s.button}>
                <div className={`${s.button__inner} + '' + ${s.activ}`}>Новые</div>
            </div>
            <div className={s.button}>
                <div className={s.button__inner}>Популярные</div>
            </div>
        </div>
    )
}


export default SortRating