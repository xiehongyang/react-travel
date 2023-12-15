import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    async (touristRouteId: string, thunkAPI) => {
        const {data} = await axios.get(
            `http://82.157.43.234:8080/api/touristRoutes/${touristRouteId}`
        );
        return data;
    }
)
export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductDetail.pending.type, state => {
            state.loading = true;
        }).addCase(getProductDetail.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        }).addCase(getProductDetail.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
