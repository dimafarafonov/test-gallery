import { configureStore } from "@reduxjs/toolkit";
import { gallerySlice } from "@/lib/storage/slices/gallerySlice";
export const store = configureStore({
  reducer: {
    gallery: gallerySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
