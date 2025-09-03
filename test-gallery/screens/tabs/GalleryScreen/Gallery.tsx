import { useCallback, useEffect } from "react";

import * as MediaLibrary from "expo-media-library";
import { GalleryList } from "./fractions/GalleryList";
import { useAppDispatch, useAppSelector } from "@/lib/storage/hooks";
import {
  addMany,
  selectPaginationData,
  setPagedInfo,
} from "@/lib/storage/slices/gallerySlice";
import { Alert } from "react-native";
import { showSettingsAlert } from "@/lib/alerts/permissionSettings";

const Gallery = () => {
  const { assets, pagedInfo } = useAppSelector(({ gallery }) =>
    selectPaginationData(gallery)
  );
  const dispatch = useAppDispatch();

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (permissionResponse?.status !== "granted") {
        await requestPermission().then((res) => {
          if (res.status === "denied") {
            showSettingsAlert();
          }
        });
      }
      loadMorePhotos();
    })();
    //Missed dependency on purpose
  }, []);

  const loadMorePhotos = useCallback(async () => {
    const fetchedAlbums = await MediaLibrary.getAssetsAsync({
      first: 50,
      after: pagedInfo?.endCursor,
    });
    const { assets, ...rest } = fetchedAlbums;

    dispatch(addMany(assets));
    dispatch(setPagedInfo(rest));
  }, [dispatch, pagedInfo]);

  const onEndReached = useCallback(() => {
    if (assets.length && pagedInfo?.hasNextPage) {
      loadMorePhotos();
    }
  }, [assets, loadMorePhotos, pagedInfo]);

  return <GalleryList items={assets} onEndReached={onEndReached} />;
};

export { Gallery };
