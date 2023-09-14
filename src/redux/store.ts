import { configureStore } from '@reduxjs/toolkit'
import { authReduser } from './Slice/authSlise'
import { useDispatch } from "react-redux";


const store = configureStore({
    reducer: {
        auth: authReduser
    }
})

export default store

//типизация селекторов
export type RootState = ReturnType<typeof store.getState>
// типизация диспатча
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch