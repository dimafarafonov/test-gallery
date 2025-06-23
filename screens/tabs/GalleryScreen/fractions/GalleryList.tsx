import { Pressable, FlatList, Dimensions, StyleSheet, View, Text } from "react-native";

import { Image } from "expo-image";

import * as MediaLibrary from "expo-media-library";
import { useCallback } from "react";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("screen");
const imageWidth = 80;
const imageHeight = 80;
const gap = 0.5;
const columnNumber = Math.round(screenWidth / (imageWidth + 8));

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyView}>
      <Text>No images to work with</Text>
    </View>
  );
};

type Props = {
  items: MediaLibrary.Asset[] | undefined;
  onEndReached: () => void;
};

const GalleryList = ({ items, onEndReached }: Props) => {
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: MediaLibrary.Asset }) => {
      const { uri, id } = item;

      return (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={() =>
            router.replace({ pathname: "/(app)/(tabs)/two", params: { id } })
          }
        >
          <Image
            source={{ uri }}
            placeholder={{ blurhash: "LGFFaXYk^6#M@-5c,1J5@[or[Q6." }} // add blurhash to avoid white spaces
            contentFit="cover"
            transition={1000}
            style={{ width: imageWidth, height: imageHeight }}
          />
        </Pressable>
      );
    },
    [router]
  );

  return (
    <FlatList
      contentContainerStyle={styles.listView}
      ListEmptyComponent={ListEmptyComponent()}
      key={columnNumber} // changing for flesh rerender support
      numColumns={columnNumber}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap }}
      data={items}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  listView: {
    width: screenWidth,
    gap,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  emptyView: { alignItems: "center", justifyContent: "center" },
});

export { GalleryList };
