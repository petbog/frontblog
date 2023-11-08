import { useSelector } from 'react-redux';
import LentItem from '../LentItem/LentItem';
import { FC } from 'react';
import { getPostSelector, getStatusSelector } from '../../redux/Slice/getPostSlise';
import { selectIdUser } from '../../redux/Slice/authSlise';
import { useEffect } from 'react'
import Skeleton from '../../skeleton/Skeleton';



const Lent: FC = () => {
  const data = useSelector(getPostSelector)
  const status = useSelector(getStatusSelector)
  const user = useSelector(selectIdUser)

  useEffect(() => { }, [data])

  const skeleton = [...new Array(3)].map((_, i) => <Skeleton key={i} />)

  return (
    <div className="">
      {
        status === 'loading' ? skeleton : data.map((item) => (
          <LentItem key={item._id} isAuner={item.user._id === user} {...item} />
        ))
      }

    </div>
  )
}

export default Lent