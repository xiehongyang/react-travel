import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null,
}

export const searchProduct = createAsyncThunk(
    'productSearch/searchProduct',
    async (parameters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string
    }, thunkAPI) => {
        let url = `http://82.157.43.234:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
        if (parameters.keywords) {
            url += `&keyword=${parameters.keywords}`;
        }
        const response = await axios.get(url);
        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination'])
        };
    }
)
export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(searchProduct.pending.type, state => {
            state.loading = true;
        }).addCase(searchProduct.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.error = null;
        }).addCase(searchProduct.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
