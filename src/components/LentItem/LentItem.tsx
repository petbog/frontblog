import { FC, useEffect, useState } from 'react';
import s from './LentItem.module.scss';
import eye from '../../img/icons8-глаза-учихи-50.png';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { DeleetePost } from '../../redux/Slice/getPostSlise';
import { Path } from '../../Path/Patch';

type propsType = {
  _id: string,
  createdAt: string,
  imageUrl: string,
  tags: string[],
  title: string,
  viewsCount: number,
  isAuner: boolean
}

const LentItem: FC<propsType> = ({ _id, createdAt, imageUrl, tags, title, viewsCount, isAuner }) => {
  const [formattedViewsCount, setFormattedViewsCount] = useState<string>('');
  const dispatch = useAppDispatch()

  const deletePost = () => {
    dispatch(DeleetePost({ _id }))
  }


  useEffect(() => {
    // Функция для форматирования даты и времени
    const formatDateTime = (isoDate: string): string => {
      const dateObject = new Date(isoDate);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      const hours = String(dateObject.getHours()).padStart(2, '0');
      const minutes = String(dateObject.getMinutes()).padStart(2, '0');
      const seconds = String(dateObject.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Форматирование даты и времени и установка результата в состояние
    const formattedCount = formatDateTime(createdAt);
    setFormattedViewsCount(formattedCount);
  }, [viewsCount]);

  return (
    <div className={s.lent}>
      <Link to={`/Post/${_id}/OnePost`}>
        <div className={s.img}>
          <img className={s.img__items} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
        </div>
      </Link>
      <div className={s.data}>
        {
          isAuner ?
            (
              <>
                <div onClick={deletePost} className={s.img__hover}>delete</div>
                <Link to={`/addPost/${_id}`} className={s.img__hover}>редактировать </Link>
              </>

            )
            :
            ''
        }
        <div className={s.data__item}>{formattedViewsCount}</div>
      </div>
      <div className={s.title}>
        <div className={s.title__item}>{title}</div>
      </div>
      {tags.map((item, index) => (
        <div key={index} className={s.tags}>
          <div className={s.tags__item}>{item}</div>
        </div>
      ))}
      <div className={s.viewsCount}>
        <img className={s.viewsCount__img} src={eye} alt="eye" />
        <div className={s.viewsCount__item}>{viewsCount}</div>
      </div>
    </div>
  );
}

export default LentItem;