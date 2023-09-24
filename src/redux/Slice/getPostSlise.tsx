import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'


export const getPost = createAsyncThunk('post/getPost', async () => {
    const { data } = await instanse.get('/posts')
    return data
})


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}

interface initialStateType {
    status: Status,
    data: []
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
        builder.addCase(getPost.pending, (state, action) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(getPost.rejected, (state, action) => {
            state.data = [];
            state.status = Status.ERROR;
        });
    },
});

export const getPostSelector = (state: RootState) => state.getPost
export const { } = getPostSlice.actions
export const getPostReduser = getPostSlice.reducer
