import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
}

export const signIn = createAsyncThunk(
    'user/signIn',
    async (parameters: {
        email: string,
        password: string
    }, thunkAPI) => {
        const {data} = await axios.post(
            `http://82.157.43.234:8080/auth/login`, {
                email: parameters.email,
                password: parameters.password
            }
        );
        return data.token;
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(signIn.pending.type, state => {
            state.loading = true;
        }).addCase(signIn.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        }).addCase(signIn.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
