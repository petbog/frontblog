import Header from "../../components/Header/Header"
import Lent from "../../components/Lent/Lent";
import SortRating from "../../components/SortRating/SortRating";
import { getPost, getPostSelectorData } from "../../redux/Slice/getPostSlise";
import { useAppDispatch } from "../../redux/store";
import s from "./Home.module.scss"
import { useEffect, useState } from 'react';
import Tags from './../../components/Tags/Tags';
import { useSelector } from "react-redux";
import WelcomPage from "../../components/WelcomPage/WelcomPage";

const Home:React.FC = () => {
    const dispatch = useAppDispatch()
    const [hasToken,setHasToken]=useState<boolean>(false)
    console.log(hasToken)

    useEffect(() => {
        dispatch(getPost())
    }, [getPost])

useEffect(()=>{

    const user = !!window.localStorage.getItem('token')
    setHasToken(user)
},['token'])


    if (!hasToken) {
        return (
            <>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home