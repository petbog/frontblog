import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'




export const fetchTags = createAsyncThunk('post/fetchTags', async () => {
    const { data } = await instanse.get<string[]>('/tags')
    return data
})


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}




interface initialStateType {
    status: Status,
    data: string[]
}

const initialState: initialStateType = {
    data: [],
    status: Status.LOADING
}


const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //получение тегов
        builder.addCase(fetchTags.pending, (state, action) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.data = [];
            state.status = Status.ERROR;
        });
    },
});

export const tagsSelector = (state: RootState) => state.tags.data
export const tagsStatusSelector = (state: RootState) => state.tags.status
export const { } = tagsSlice.actions
export const tagsReduser = tagsSlice.reducer
