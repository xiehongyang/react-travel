import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {checkout} from "../../redux/shoppingCart/slice";


interface OrderState {
    loading: boolean;
    error: string | null;
    currentOrder: any;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
}

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
        const {data} = await axios.post(
            `http://82.157.43.234:8080/api/orders/${parameters.orderId}/placeOrder`,
            null, {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data;
    }
)
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(placeOrder.pending.type, state => {
            state.loading = true;
        }).addCase(placeOrder.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null;
        }).addCase(placeOrder.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(checkout.pending.type, state => {
            state.loading = true;
        }).addCase(checkout.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null;
        }).addCase(checkout.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
