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
import ButtonTheme from "../../components/ButtonTheme/ButtonTheme";

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [hasToken, setHasToken] = useState<boolean>(false)
    

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch, getPost])



    useEffect(() => {
        const user = Boolean(window.localStorage.getItem('token'))
        setHasToken(user)
        if (user === false) {
            navigate(Path.WelcomPage)
        }
    }, [])

    useEffect(() => {
    
    }, [hasToken])

    return (
        <div className={s.container_button}>
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
            <ButtonTheme />
        </div>
    )
}

export default Home