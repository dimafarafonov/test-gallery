import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { Asset, type PagedInfo } from "expo-media-library";

export const galleryAdapter = createEntityAdapter<Asset>();
const initialState = galleryAdapter.getInitialState<{
  currentImageFilters: null;
  selectedImage: Asset | null;
  pagedInfo: Omit<PagedInfo<Asset>, "assets"> | null;
}>({
  currentImageFilters: null,
  selectedImage: null,
  pagedInfo: null,
});

export const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {
    addMany: galleryAdapter.addMany,
    setMany: galleryAdapter.setMany,
    setPagedInfo: (
      state,
      action: PayloadAction<Omit<PagedInfo<Asset>, "assets"> | null>
    ) => {
      state.pagedInfo = action.payload;
    },
  },
});
export const { selectAll, selectById, selectEntities } = galleryAdapter.getSelectors();
export const selectPagedInfo = (gallery: typeof initialState) => gallery.pagedInfo;

export const selectPaginationData = createSelector(
  [selectAll, selectPagedInfo],
  (assets, pagedInfo) => {
    return {
      assets,
      pagedInfo,
    };
  }
);

export const { addMany, setMany, setPagedInfo } = gallerySlice.actions;
