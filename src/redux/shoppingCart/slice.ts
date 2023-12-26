import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

export const getShoppingCart = createAsyncThunk(
    'shoppingCart/getShoppingCart',
    async (jwt: string, thunkAPI) => {
        const {data} = await axios.get(
            `shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)

export const addShoppingCartItem = createAsyncThunk(
    'shoppingCart/addShoppingCartItem',
    async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
        const {data} = await axios.post(
            `shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)


export const checkout = createAsyncThunk(
    'shoppingCart/checkout',
    async (jwt: string, thunkAPI) => {
        const {data} = await axios.post(
            `shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return data;
    }
)

export const clearShoppingCartItem = createAsyncThunk(
    'shoppingCart/clearShoppingCartItem',
    async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `shoppingCart/items/(${parameters.itemIds.join(',')})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
    }
)
export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getShoppingCart.pending.type, state => {
            state.loading = true;
        }).addCase(getShoppingCart.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        }).addCase(getShoppingCart.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(addShoppingCartItem.pending.type, state => {
            state.loading = true;
        }).addCase(addShoppingCartItem.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        }).addCase(addShoppingCartItem.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(clearShoppingCartItem.pending.type, state => {
            state.loading = true;
        }).addCase(clearShoppingCartItem.fulfilled.type, (state) => {
            state.loading = false;
            state.items = [];
            state.error = null;
        }).addCase(clearShoppingCartItem.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(checkout.pending.type, state => {
            state.loading = true;
        }).addCase(checkout.fulfilled.type, (state, action) => {
            state.loading = false;
            state.items = [];
            state.error = null;
        }).addCase(checkout.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
