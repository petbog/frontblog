import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'


type params = {
    title: string,
    tags: string,
    text: string,
    imageUrl: string
}

export const addPost = createAsyncThunk<dataType, params>('post/addPost', async (params: params) => {
    const { data } = await instanse.post<dataType>('/posts', params)
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


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //создание поста
        builder.addCase(addPost.pending, (state, action) => {
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
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(addPost.rejected, (state, action) => {
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

export const dataSelector = (state: RootState) => state.post.data
export const { } = postSlice.actions
export const postReduser = postSlice.reducer