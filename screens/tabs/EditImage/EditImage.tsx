import { Button, StyleSheet, useWindowDimensions, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { View } from "@/components/Themed";
import { selectById } from "@/lib/storage/slices/gallerySlice";
import { useAppSelector } from "@/lib/storage/hooks";

import {
  Canvas,
  Image,
  Skia,
  SkImage,
  ColorMatrix,
  useCanvasRef,
} from "@shopify/react-native-skia";
//first decision was react-native-color-matrix-image-filters + view-shot but
import { readAsStringAsync, EncodingType } from "expo-file-system";

import { useCallback, useEffect, useState } from "react";
import { Asset, getAssetInfoAsync } from "expo-media-library";
import { grayscaleMatrix, invertMatrix1 } from "./configs";
import { useControls } from "./useControls";
import { BasicLoader } from "@/lib/loaders/BasicLoader";

export const EditImage = () => {
  const [skiaImage, setSkiaImage] = useState<SkImage | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const ref = useCanvasRef();
  const { width, height } = useWindowDimensions();

  const params = useLocalSearchParams<{ id: string }>();
  const image = useAppSelector((state) => selectById(state.gallery, params?.id));

  const {
    saveToGalleryFromCanvas,
    addGrayscale,
    addInverted,
    goBack,
    reset,
    state: { grayscale, inverted },
  } = useControls();

  const convertPhotoToBase64 = useCallback(async (galleryImage: Asset) => {
    setIsConverting(true);
    try {
      if (!galleryImage) {
        throw new Error("No local URI found for asset");
      }
      const { localUri } = await getAssetInfoAsync(galleryImage);

      const base64 = await readAsStringAsync(localUri as string, {
        encoding: EncodingType.Base64,
      });

      const data = Skia.Data.fromBase64(base64);
      const image = Skia.Image.MakeImageFromEncoded(data);
      setSkiaImage(image);
    } finally {
      setIsConverting(false);
    }
  }, []);

  useEffect(() => {
    convertPhotoToBase64(image);
    // adding convertPhotoToBase64 doesn't make sense, as it is dependency array is []
  }, [image]);

  if (isConverting) {
    return <BasicLoader />;
  }

  if (!skiaImage) {
    return (
      <View style={styles.emptyState}>
        <Text>We couldn&apos;t parse this image</Text>
      </View>
    );
  }

  return (
    <>
      <Canvas ref={ref} style={{ width: width, height: height / 2 }}>
        <Image
          image={skiaImage}
          fit="cover"
          x={0}
          y={0}
          width={width}
          height={height / 2}
        >
          {grayscale && <ColorMatrix matrix={grayscaleMatrix} />}
          {inverted && <ColorMatrix matrix={invertMatrix1} />}
        </Image>
      </Canvas>

      <View style={[styles.controls, { bottom: 100 }]}>
        <Button title="Grayscale" onPress={addGrayscale} />
        <Button title="Inverted" onPress={addInverted} />
      </View>
      <View style={styles.controls}>
        <Button title="Save" onPress={() => saveToGalleryFromCanvas(ref)} />
        <Button title="Back" onPress={goBack} />
        <Button title="Reset" onPress={reset} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignSelf: "center",
    gap: 50,
    backgroundColor: "transparent",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
