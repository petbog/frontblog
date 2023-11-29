import { FC, useEffect, useState } from 'react';
import s from './LentItem.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { DeleetePost, commentsType } from '../../redux/Slice/getPostSlise';
import zamena from '../../img/Прикольные-заставки-на-рабочий-стол-с-надписями-1.jpg'
import userzamena from '../../img/user.png'
import { REACT_APP_API_URL } from '../../axios';

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
  comments: commentsType[]
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
              <img className={s.img__items} src={`${REACT_APP_API_URL}${imageUrl}`} alt="imageUrl" />
              : <img className={s.img__items} src={zamena} alt="zamena" />
          }
        </div>
      </Link>
      <div className={s.data}>
        {
          isAuner ?
            (
              <div className={s.redactions}>
                <Link to={`/addPost/${_id}`} >
                  {
                   <svg className={s.redactions__pencil}  viewBox="0 0 128 128"  xmlns="http://www.w3.org/2000/svg" ><g><path d="M91.4,63.5L64.5,36.6L1,100.1V127h26.9L91.4,63.5z M9,119v-15.6l55.5-55.5l15.6,15.6L24.6,119H9z"/><rect height="8" width="44" x="55" y="119"/><rect height="8" width="8" x="109" y="119"/><path d="M71.6,29.6l26.9,26.9L116.8,38L90,11.2L71.6,29.6z M98.4,45.1L82.9,29.6l7.1-7.1L105.5,38L98.4,45.1z"/></g></svg>
                  }
                </Link>
                {
                  <svg onClick={deletePost} className={s.redactions__close} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                }
              </div>

            )
            :
            ''
        }
        <div className={s.user}>
          {avatarUrl ? <img className={s.user__avatar} src={`${REACT_APP_API_URL}${avatarUrl}`} alt="avatar" />
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
        {
          <svg className={s.viewsCount__img} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            width="800px" height="800px" viewBox="0 0 442.04 442.04"
          >
            <g>
              <g>
                <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
                c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
                c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
                c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
                c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
                c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
                c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"/>
              </g>
              <g>
                <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
                c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
                c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
                s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"/>
              </g>
              <g>
                <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />
              </g>
            </g>
          </svg>
        }
        <div className={s.viewsCount__item}>{viewsCount}</div>
        {
          <svg className={s.viewsCount__commentsImg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V18V21L6.46667 18.4C6.81286 18.1404 7.23393 18 7.66667 18H19C20.1046 18 21 17.1046 21 16V6C21 4.89543 20.1046 4 19 4Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
        }
        <div className={s.viewsCount__length}>{comments.length}</div>
      </div>
    </div>
  );
}

export default LentItem;