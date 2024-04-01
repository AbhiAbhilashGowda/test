// src/store/inventorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Inventory";

interface InventoryState {
  products: Product[];
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  categories: string[];
}

const initialState: InventoryState = {
  products: [],
  totalProducts: 0,
  totalStoreValue: 30550,
  outOfStock: 0,
  categories: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.totalProducts = action.payload.length;
      state.outOfStock = action.payload.filter(
        (product) => product.quantity === 0
      ).length;
      state.categories = Array.from(
        new Set(action.payload.map((product) => product.category))
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        // Update other state properties accordingly
        state.totalStoreValue = state.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        state.outOfStock = state.products.filter(
          (product) => product.quantity === 0
        ).length;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      // Update other state properties accordingly
      state.totalProducts = state.products.length;
      state.outOfStock = state.products.filter(
        (product) => product.quantity === 0
      ).length;
      state.categories = Array.from(
        new Set(state.products.map((product) => product.category))
      );
    },
    disableProduct: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.products[index].isDisabled = true;
      }
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, disableProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
