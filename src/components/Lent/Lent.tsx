import { useSelector } from 'react-redux';
import LentItem from '../LentItem/LentItem';
import s from './Lent.module.scss'
import { FC } from 'react';
import { getPostSelector } from '../../redux/Slice/getPostSlise';



const Lent: FC = () => {
    const data = useSelector(getPostSelector)
    return (
        <div className="">
            {
                data.map((item) => (
                    <LentItem key={item._id} {...item} />
                ))
            }

        </div>
    )
}


export default Lent