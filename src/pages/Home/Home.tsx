import Header from "../../components/Header/Header"
import Lent from "../../components/Lent/Lent";
import SortRating from "../../components/SortRating/SortRating";
import { getPost } from "../../redux/Slice/getPostSlise";
import { useAppDispatch } from "../../redux/store";
import s from "./Home.module.scss"
import { useEffect } from 'react';
import Tags from './../../components/Tags/Tags';
import Comments from "../../components/Comments/Comments";

const Home = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPost())
    }, [getPost])
    return (
        <>
            <Header />
            <div className={s.container}>
                <SortRating />
                <div className={s.itembox}>
                    <Lent />
                    <div className={s.sortbar}>
                        <Tags />
                        <Comments />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home