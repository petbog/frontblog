import Header from "../../components/Header/Header"
import Lent from "../../components/Lent/Lent";
import SortRating from "../../components/SortRating/SortRating";
import { getPost, getPostSelectorData } from "../../redux/Slice/getPostSlise";
import { useAppDispatch } from "../../redux/store";
import s from "./Home.module.scss"
import { useEffect } from 'react';
import Tags from './../../components/Tags/Tags';
import Comments from "../../components/Comments/Comments";
import { useSelector } from "react-redux";
import WelcomPage from "../../components/WelcomPage/WelcomPage";

const Home = () => {
    const dispatch = useAppDispatch()
    const { data } = useSelector(getPostSelectorData)

    useEffect(() => {
        dispatch(getPost())
    }, [getPost])
    if (data.length === 0) {
        return (
            <> <Header />
                <WelcomPage />
            </>
        )
    }
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