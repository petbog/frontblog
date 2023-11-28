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

type params = {
    title: string,
    tags: string,
    text: string,
    imageUrl: string
}

export const addPost = createAsyncThunk<postType[], params>('getPost/addPost', async (params: params) => {
    const { data } = await instanse.post('/posts', params)
    return data
})

type typeParams = {
    title: string,
    tags: string,
    text: string,
    imageUrl: string
}
type removeParamsType = {
    _id: string | undefined,
    params: typeParams
}
export const RemovePost = createAsyncThunk('getPost/RemovePost', async (removeParams: removeParamsType) => {
    const { _id, params } = removeParams
    const { data } = await instanse.patch(`/posts/${_id}`, params)
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
    comments: commentsType[],
    fullName: string,
    email: string,
}
export type commentsType = {
    createdAt: string,
    post: string,
    text: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

type postType = {
    _id: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    imageUrl: string,
    user: userType,
    viewsCount: number,
    tags: string[],
    text: string,
    title: string
    comments: commentsType[],
}

interface initialStateType {
    status: Status,
    data: dataType[],
    post: postType[],
    poppup: boolean
}

const initialState: initialStateType = {
    data: [],
    // post: {
    //     _id: '',
    //     fullName: '',
    //     email: '',
    //     createdAt: '',
    //     updatedAt: '',
    //     __v: 0,
    //     imageUrl: '',
    //     user: '',
    //     viewsCount: 0,
    //     tags: [],
    //     text: '',
    //     title: '',
    //     comments: []
    // },
    post:[],
    status: Status.LOADING,
    poppup: false
}


const getPostSlice = createSlice({
    name: 'getPost',
    initialState,
    reducers: {
        eyePoppup: (state, action) => {
            state.poppup = action.payload
        }
    },
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
        //создание поста
        builder.addCase(addPost.pending, (state, action) => {
            state.post = [];
            state.status = Status.LOADING;
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            const newData = action.payload.filter((item:postType) => {
                return !state.data.some((existingItem) => existingItem._id === item._id);
              });
              state.data = [...state.data, ...newData];
            state.status = Status.SUCCESS;
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.status = Status.ERROR;
        });
        //измение поста
        builder.addCase(RemovePost.pending, (state, action) => {
            state.post =[];
            state.status = Status.LOADING;
        });
        builder.addCase(RemovePost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(RemovePost.rejected, (state, action) => {
            state.post = []
            state.status = Status.ERROR;
        });
    },
});

export const getPostSelector = (state: RootState) => state.getPost.data
export const getStatusSelector = (state: RootState) => state.getPost.status
export const getPostSelectorData = (state: RootState) => state.getPost
export const getPostSelectorPoppup = (state: RootState) => state.getPost.poppup
export const dataSelector = (state: RootState) => state.getPost.data
export const { eyePoppup } = getPostSlice.actions
export const getPostReduser = getPostSlice.reducer
