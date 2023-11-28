import { configureStore } from '@reduxjs/toolkit'
import { authReduser } from './Slice/authSlise'
import { useDispatch } from "react-redux";
import { getPostReduser } from './Slice/getPostSlise';
import { tagsReduser } from './Slice/getTags';
import { onePostReduser } from './Slice/onePostsSice';


const store = configureStore({
    reducer: {
        auth: authReduser,
        getPost:getPostReduser,
        tags:tagsReduser,
        onePost:onePostReduser,
    }
})

export default store

//типизация селекторов
export type RootState = ReturnType<typeof store.getState>
// типизация диспатча
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch