import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'
import { AxiosError } from 'axios'

export type userParams = {
    email: string,
    password: string,
    fullName: string,
    avatarUrl: null | string
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: userParams, { rejectWithValue }) => {
    try {
        const { data } = await instanse.post(`/auth/register`, params);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data || 'Request failed');
        } else {
            throw error;
        }
    }
});

export const fetchMe = createAsyncThunk('me/fetchMe', async () => {
    const { data } = await instanse.get('/auth/me')
    return data
})

export type loginParams = {
    email: string;
    password: string;
}

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (params: loginParams) => {
    const { data } = await instanse.post('/auth/login', params)
    return data
})



export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}

type itemRegister = {
    email: string,
    password: string,
    fullName: string,
    avatarUrl: null | string
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

type errorType={
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

interface authType {
    data: dataType;
    status: Status;
    items: itemRegister;
    error: errorType[]
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
        avatarUrl: null
    },
    error: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.items = action.payload
        },
        removeUser: (state) => {
            state.data = {
                createdAt: '',
                email: '',
                fullName: '',
                token: '',
                updatedAt: '',
                __v: 0,
                _id: '',
            }
        }
    },
    extraReducers: (builder) => {
        //регистрация
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
        builder.addCase(fetchRegister.rejected, (state, action:PayloadAction<any>) => {
            state.data = {
                createdAt: '',
                email: '',
                fullName: '',
                token: '',
                updatedAt: '',
                __v: 0,
                _id: '',
            }; 
            state.error = action.payload
            state.status = Status.ERROR
        });
        //обо мне
        builder.addCase(fetchMe.pending, (state, action) => {
            state.data = {
                createdAt: '',
                email: '',
                fullName: '',
                token: '',
                updatedAt: '',
                __v: 0,
                _id: '',
            };
            state.status = Status.LOADING;
        });
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchMe.rejected, (state, action) => {
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
        //логинизация
        builder.addCase(fetchLogin.pending, (state, action) => {
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
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
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

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data.email)
export const selectIdUser = (state: RootState) => state.auth.data._id
export const selectIdError = (state: RootState) => state.auth.error
export const itemsAuth = (state: RootState) => state.auth
export const { addUser, removeUser } = authSlice.actions
export const authReduser = authSlice.reducer


