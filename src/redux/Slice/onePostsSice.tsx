import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanse from '../../axios'
import { RootState } from '../store'




export const getOnePost = createAsyncThunk('post/getOnePost', async (_id: string | undefined) => {
    const { data } = await instanse.get<dataType>(`/posts/${_id}`)
    return data
})

type CommetnParams = {
    postId: string | undefined,
    comment: string,
}

export const createComment = createAsyncThunk('post/createComment', async (params: CommetnParams) => {
    const { postId } = params
    const { data } = await instanse.post(`/posts/${postId}/comment`, params)
    return data
})

export const deleteComment = createAsyncThunk('post/deleteComment', async (commentId: string) => {
    const { data } = await instanse.delete(`/comments/${commentId}`)
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

type commentsType = {
    createdAt: string,
    post: string,
    text: string,
    updatedAt: string,
    __v: number,
    _id: string,
}
type dataType = {
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
    title: string,
    comments: commentsType[],
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
        user: {
            avatarUrl: '',
            createdAt: '',
            email: '',
            fullName: '',
            passwordHash: '',
            updatedAt: '',
            __v: 0,
            _id: ''
        },
        viewsCount: 0,
        tags: [],
        text: '',
        title: '',
        comments: [],
    },
    status: Status.LOADING
}


const onePostSlice = createSlice({
    name: 'onePost',
    initialState,
    reducers: {
        filterComment: (state, action) => {
            state.data.comments = state.data.comments.filter((comments)=> comments._id !== action.payload)
        }
    },
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
                user: {
                    avatarUrl: '',
                    createdAt: '',
                    email: '',
                    fullName: '',
                    passwordHash: '',
                    updatedAt: '',
                    __v: 0,
                    _id: ''
                },
                viewsCount: 0,
                tags: [],
                text: '',
                title: '',
                comments: [],
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
                user: {
                    avatarUrl: '',
                    createdAt: '',
                    email: '',
                    fullName: '',
                    passwordHash: '',
                    updatedAt: '',
                    __v: 0,
                    _id: ''
                },
                viewsCount: 0,
                tags: [],
                text: '',
                title: '',
                comments: [],
            };
            state.status = Status.ERROR;
        });
        //Добавление комментария
        builder.addCase(createComment.pending, (state, action) => {
            state.status = Status.LOADING;
        });
        builder.addCase(createComment.fulfilled, (state, action) => {

            state.data = {
                ...state.data, // Копируем существующие свойства объекта data
                comments: [...state.data.comments, action.payload], // Добавляем новый комментарий в конец массива
            };
            state.status = Status.SUCCESS;
        });
        builder.addCase(createComment.rejected, (state, action) => {
            state.data = {
                _id: '',
                fullName: '',
                email: '',
                createdAt: '',
                updatedAt: '',
                __v: 0,
                imageUrl: '',
                user: {
                    avatarUrl: '',
                    createdAt: '',
                    email: '',
                    fullName: '',
                    passwordHash: '',
                    updatedAt: '',
                    __v: 0,
                    _id: ''
                },
                viewsCount: 0,
                tags: [],
                text: '',
                title: '',
                comments: [],
            };
            state.status = Status.ERROR;
        });
        //удаление комментария
        builder.addCase(deleteComment.pending, (state, action) => {
            state.status = Status.LOADING;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
        });
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.status = Status.ERROR;
        });
    },
});

export const onePostSelector = (state: RootState) => state.onePost.data
export const {filterComment } = onePostSlice.actions
export const onePostReduser = onePostSlice.reducer
