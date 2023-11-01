import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'

//получение постов
export const getPost = createAsyncThunk<dataType[]>('post/getPost', async () => {
    const { data } = await instanse.get<dataType[]>('/posts')
    return data
})


type deleteParams = {
    _id: string
}
//удаление поста
export const DeleetePost = createAsyncThunk('post/DeleetePost', async ({ _id }: deleteParams) => {
    const { data } = await instanse.delete(`/post/${_id}`)
    return data
})

//посты по популярности
export const populatePost = createAsyncThunk('post/populatePost', async () => {
    const { data } = await instanse.get('/populate')
    return data
})
//посты по новизне
export const newSortPost = createAsyncThunk('post/newPost', async () => {
    const { data } = await instanse.get('/new')
    return data
})

type paramsTag = {
    tag: string
}

export const articlesbytag = createAsyncThunk<dataType[], paramsTag>('post/articlesbytag', async (params) => {
    const { tag } = params
    const { data } = await instanse.get<dataType[]>('articlesbytag', { params: { tag } })
    return data
})

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'succes',
    ERROR = 'error'
}

type userType = {
    avatarUrl: string,
    createdAt: string,
    email: string,
    fullName: string,
    passwordHash: string,
    updatedAt: string,
    __v: number,
    _id: string,
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
    __v: number,
    user: userType,
    comments:string[]
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
        //получение популярных постов
        builder.addCase(populatePost.pending, (state) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(populatePost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(populatePost.rejected, (state) => {
            state.data = [];
            state.status = Status.ERROR;
        });
        //получение новых
        builder.addCase(newSortPost.pending, (state) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(newSortPost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(newSortPost.rejected, (state) => {
            state.data = [];
            state.status = Status.ERROR;
        });
        //получение постов по тегу
        builder.addCase(articlesbytag.pending, (state) => {
            state.data = [];
            state.status = Status.LOADING;
        });
        builder.addCase(articlesbytag.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(articlesbytag.rejected, (state) => {
            state.data = [];
            state.status = Status.ERROR;
        });
        //удаление поста
        builder.addCase(DeleetePost.pending, (state, action) => {
            state.data = state.data.filter(obj => obj._id !== action.meta.arg._id)
        });

    },
});

export const getPostSelector = (state: RootState) => state.getPost.data
export const getPostSelectorData = (state: RootState) => state.getPost
export const { } = getPostSlice.actions
export const getPostReduser = getPostSlice.reducer
