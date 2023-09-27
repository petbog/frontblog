import { FC, useEffect, useState } from 'react';
import s from './LentItem.module.scss';
import eye from '../../img/icons8-глаза-учихи-50.png';
import { Link } from 'react-router-dom';

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

console.log(isAuner)

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
    <Link to={`/Post/${_id}/OnePost`} className={s.lent}>
      <div className={s.img}>
        <img className={s.img__items} src={`http://localhost:4444${imageUrl}`} alt="imageUrl" />
      </div>
      <div className={s.data}>
        {
          isAuner ? <div className={s.img__hover}>delete</div> : ''
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
    </Link>
  );
}

export default LentItem;