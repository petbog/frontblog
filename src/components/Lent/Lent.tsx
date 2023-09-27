import { useSelector } from 'react-redux';
import LentItem from '../LentItem/LentItem';
import s from './Lent.module.scss'
import { FC, useEffect, useState } from 'react';
import { getPostSelector } from '../../redux/Slice/getPostSlise';
import { selectIdUser } from '../../redux/Slice/authSlise';



const Lent: FC = () => {
    const data = useSelector(getPostSelector)
    const userPostId  = useSelector(getPostSelector)
    const user  = useSelector(selectIdUser)
    const[idis,setIdis]=useState<string[]>([])
    useEffect(() => {
      if (userPostId.length > 0) {
        const userIds = userPostId.map((post) => post.user._id);
        setIdis(userIds);
      } else {
        console.log("Массив userPostId пуст");
      }
    }, [userPostId]); 
  
  
    return (
        <div className="">
            {
                data.map((item) => (
                    <LentItem key={item._id} isAuner={item.user._id === user  } {...item} />
                ))
            }

        </div>
    )
}
// isAuner={idis.includes(user) }
export default Lent