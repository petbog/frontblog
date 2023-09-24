import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'


export const getPost = createAsyncThunk<dataType[]>('post/getPost', async () => {
    const { data } = await instanse.get<dataType[]>('/posts')
    return data
})


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}

type userType={
    _id:string,
    fullName:string,
    email:string,
    passwordHash:string,
    createdAt:string,
    updatedAt:string,
}

export type dataType = {
    _id: string,
    title: string,
    text: string,
    tags: string[],
    viewsCount: number,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    __v:number,
    user:userType[]
}


interface initialStateType {
    status: Status,
    data: dataType[]
}

const initialState: initialStateType = {
    data: [],
    status: Status.LOADING
}


const getPostSlice = createSlice({
    name: 'getPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //получение постов
        builder.addCase(getPost.pending, (state) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(getPost.rejected, (state) => {
            state.data = [];
            state.status = Status.ERROR;
        });
    },
});

export const getPostSelector = (state: RootState) => state.getPost.data
export const { } = getPostSlice.actions
export const getPostReduser = getPostSlice.reducer
