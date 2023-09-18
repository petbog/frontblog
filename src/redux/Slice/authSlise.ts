import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'

export type userParams = {
    email: string,
    password: string,
    fullName: string,
    avatarUrl: string
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: userParams) => {


    const { data } = await instanse.post(`/auth/register`, params);

    return data;
});



export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}

type itemRegister = {
    email: string,
    password: string,
    fullName: string,
    avatarUrl: string
}

type dataType = {
    createdAt: string,
    email: string,
    fullName: string,
    token: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

interface authType {
    data: dataType;
    status: Status;
    items: itemRegister
}

const initialState: authType = {
    data: {
        createdAt: '',
        email: '',
        fullName: '',
        token: '',
        updatedAt: '',
        __v: 0,
        _id: '',
    },
    status: Status.LOADING,
    items: {
        email: '',
        password: '',
        fullName: '',
        avatarUrl: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.pending, (state, action) => {
            state.data = {
                createdAt: '',
                email: '',
                fullName: '',
                token: '',
                updatedAt: '',
                __v: 0,
                _id: '',
            };;
            state.status = Status.LOADING;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.data = {
                createdAt: '',
                email: '',
                fullName: '',
                token: '',
                updatedAt: '',
                __v: 0,
                _id: '',
            };
            state.status = Status.ERROR
        });
    }
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)
export const itemsAuth = (state: RootState) => state.auth
export const { addUser } = authSlice.actions
export const authReduser = authSlice.reducer


