import Header from "../../components/Header/Header"
import Lent from "../../components/Lent/Lent";
import SortRating from "../../components/SortRating/SortRating";
import { getPost } from "../../redux/Slice/getPostSlise";
import { useAppDispatch } from "../../redux/store";
import s from "./Home.module.scss"
import { useEffect, useState } from 'react';
import Tags from './../../components/Tags/Tags';
import { useNavigate } from "react-router-dom";
import { Path } from "../../Path/Patch";

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [hasToken, setHasToken] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch,getPost])

    useEffect(() => {
        const user = !!window.localStorage.getItem('token')
        setHasToken(user)
    }, [])


    if (!hasToken) {
        navigate(Path.WelcomPage)
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home