import { CanvasRef } from "@shopify/react-native-skia";
import { EncodingType, documentDirectory, writeAsStringAsync } from "expo-file-system";
import { saveToLibraryAsync } from "expo-media-library";
import { useRouter } from "expo-router";
import { useCallback, useReducer } from "react";
import { Alert } from "react-native";
import { Buffer } from "buffer";

type State = {
  grayscale: boolean;
  inverted: boolean;
};

enum ACTION {
  ADD_GRAYSCALE = "add_grayscale",
  ADD_INVERTED = "add_inverted",
  RESET = "reset",
}
type Action =
  | { type: ACTION.ADD_GRAYSCALE }
  | { type: ACTION.ADD_INVERTED }
  | { type: ACTION.RESET };

const initialState: State = {
  grayscale: false,
  inverted: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTION.ADD_GRAYSCALE:
      return {
        ...state,
        grayscale: !state.grayscale,
      };
    case ACTION.ADD_INVERTED:
      return {
        ...state,
        inverted: !state.inverted,
      };
    case ACTION.RESET:
      return initialState;
    default:
      throw new Error("Unknown action.");
  }
}

export const useControls = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  const addGrayscale = useCallback(() => {
    dispatch({ type: ACTION.ADD_GRAYSCALE });
  }, [dispatch]);

  const addInverted = useCallback(() => {
    dispatch({ type: ACTION.ADD_INVERTED });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: ACTION.RESET });
  }, [dispatch]);

  const goBack = useCallback(() => {
    router.replace({ pathname: "/(app)/(tabs)" });
  }, [router]);

  const saveToGalleryFromCanvas = useCallback(
    async (ref: React.RefObject<CanvasRef | null>) => {
      const image = await ref.current?.makeImageSnapshotAsync();

      try {
        const bytes = image?.encodeToBytes();
        const base64String = Buffer.from(bytes as Uint8Array<ArrayBufferLike>).toString(
          EncodingType.Base64
        );
        const filename = documentDirectory + "temp.png";
        await writeAsStringAsync(filename, base64String, {
          encoding: EncodingType.Base64,
        });

        await saveToLibraryAsync(filename).then(() =>
          Alert.alert("You image is saved to gallery!")
        );
      } catch (error) {
        console.log("errr", error);
      }
    },
    []
  );

  return { addGrayscale, addInverted, reset, goBack, state, saveToGalleryFromCanvas };
};
