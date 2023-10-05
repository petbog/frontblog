import { useSelector } from 'react-redux';
import LentItem from '../LentItem/LentItem';
import s from './Lent.module.scss'
import { FC } from 'react';
import { getPostSelector } from '../../redux/Slice/getPostSlise';
import { selectIdUser } from '../../redux/Slice/authSlise';
import { Status } from '../../redux/Slice/postSise';
import { useEffect } from 'react'



const Lent: FC = () => {
  const data = useSelector(getPostSelector)
  const user = useSelector(selectIdUser)

  useEffect(() => { }, [data])

  return (
    <div className="">
      {
        Status.SUCCESS ? data.map((item) => (
          <LentItem key={item._id} isAuner={item.user._id === user} {...item} />
        )) : ''
      }

    </div>
  )
}

export default Lent