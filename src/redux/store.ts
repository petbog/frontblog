import { configureStore } from '@reduxjs/toolkit'
import { authReduser } from './Slice/authSlise'
import { useDispatch } from "react-redux";
import { postReduser } from './Slice/postSise';
import { getPostReduser } from './Slice/getPostSlise';
import { tagsReduser } from './Slice/getTags';


const store = configureStore({
    reducer: {
        auth: authReduser,
        post: postReduser,
        getPost:getPostReduser,
        tags:tagsReduser
    }
})

export default store

//типизация селекторов
export type RootState = ReturnType<typeof store.getState>
// типизация диспатча
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch