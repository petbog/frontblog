import { FC, useEffect, useState } from 'react';
import s from './LentItem.module.scss';
import eye from '../../img/eye-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { DeleetePost } from '../../redux/Slice/getPostSlise';
import zamena from '../../img/Прикольные-заставки-на-рабочий-стол-с-надписями-1.jpg'
import pencil from '../../img/4213412-compose-document-edit-pen-pencil-write_115364.svg'
import close from '../../img/-clear_90704.svg'
import userzamena from '../../img/user.png'
import commentImg from '../../img/comment-line-svgrepo-com.svg'

type UserType = {
  avatarUrl: string,
  createdAt: string,
  email: string,
  fullName: string,
  passwordHash: string,
  updatedAt: string,
  __v: number,
  _id: string,
}

type propsType = {
  _id: string,
  createdAt: string,
  imageUrl: string,
  tags: string[],
  title: string,
  viewsCount: number,
  isAuner: boolean
  user: UserType,
  comments: string[]
}

const LentItem: FC<propsType> = ({ _id, createdAt, imageUrl, tags, title, viewsCount, isAuner, user, comments }) => {
  const { avatarUrl, fullName } = user
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
          {
            imageUrl ?
              <img className={s.img__items} src={`react-api-url${imageUrl}`} alt="imageUrl" />
              : <img className={s.img__items} src={zamena} alt="zamena" />
          }
        </div>
      </Link>
      <div className={s.data}>
        {
          isAuner ?
            (
              <div className={s.redactions}>
                <Link to={`/addPost/${_id}`} > <img className={s.redactions__pencil} src={pencil} alt="" /> </Link>
                <img onClick={deletePost} src={close} alt="pencil" className={s.redactions__close} />
              </div>

            )
            :
            ''
        }
        <div className={s.user}>
          {avatarUrl ? <img className={s.user__avatar} src={`react-api-url${avatarUrl}`} alt="avatar" />
            : <img className={s.user__avatar} src={userzamena} alt="user" />}
          {fullName && <div className={s.user__name}>{fullName}</div>}
        </div>
      </div>
      <div className={s.count}>
        <div className={s.count__item}>{formattedViewsCount}</div>
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
        <img className={s.viewsCount__commentsImg} src={commentImg} alt="commentImg" />
        <div className={s.viewsCount__length}>{comments.length}</div>
      </div>
    </div>
  );
}

export default LentItem;