import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'




export const getOnePost = createAsyncThunk('post/getOnePost', async (_id: string | undefined) => {
    const { data } = await instanse.get<dataType>(`/posts/${_id}`)
    return data
})

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}


type dataType = {
    _id: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    imageUrl: string,
    user: string,
    viewsCount: number,
    tags: string[],
    text: string,
    title: string
}

interface initialStateType {
    status: Status,
    data: dataType
}

const initialState: initialStateType = {
    data: {
        _id: '',
        fullName: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        imageUrl: '',
        user: '',
        viewsCount: 0,
        tags: [],
        text: '',
        title: ''
    },
    status: Status.LOADING
}


const onePostSlice = createSlice({
    name: 'onePost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //получение одной статьи
        builder.addCase(getOnePost.pending, (state, action) => {
            state.data = {
                _id: '',
                fullName: '',
                email: '',
                createdAt: '',
                updatedAt: '',
                __v: 0,
                imageUrl: '',
                user: '',
                viewsCount: 0,
                tags: [],
                text: '',
                title: ''
            };
            state.status = Status.LOADING;
        });
        builder.addCase(getOnePost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(getOnePost.rejected, (state, action) => {
            state.data = {
                _id: '',
                fullName: '',
                email: '',
                createdAt: '',
                updatedAt: '',
                __v: 0,
                imageUrl: '',
                user: '',
                viewsCount: 0,
                tags: [],
                text: '',
                title: ''
            };
            state.status = Status.ERROR;
        });
    },
});

export const onePostSelector = (state: RootState) => state.onePost.data
export const { } = onePostSlice.actions
export const onePostReduser = onePostSlice.reducer
