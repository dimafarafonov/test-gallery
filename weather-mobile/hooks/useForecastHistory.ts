import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "@forecast_history";

export type ForecastHistoryItem = {
  key: string;
  label: string;
  timestamp: number;
};

type UseForecastHistoryReturn = {
  history: ForecastHistoryItem[];
  setHistoryEntry: (entry: Omit<ForecastHistoryItem, "timestamp">) => Promise<void>;
  deleteItem: (key: string) => Promise<void>;
};

export const useForecastHistory = (): UseForecastHistoryReturn => {
  const [history, setHistory] = useState<ForecastHistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setHistory(JSON.parse(stored) as ForecastHistoryItem[]);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    loadHistory();
  }, [history]);

  const saveHistory = async (newHistory: ForecastHistoryItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory)).then(() => setHistory(newHistory));
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  };

  const setHistoryEntry = useCallback(
    async (entry: Omit<ForecastHistoryItem, "timestamp">) => {
      const existingIndex = history.findIndex((i) => i.key === entry.key);

      let newHistory: ForecastHistoryItem[];
      if (existingIndex !== -1) {
        newHistory = history.map((i, idx) =>
          idx === existingIndex ? { ...i, label: entry.label, timestamp: Date.now() } : i
        );
      } else {
        const newItem: ForecastHistoryItem = {
          ...entry,
          timestamp: Date.now(),
        };
        newHistory = [newItem, ...history];
      }

      await saveHistory(newHistory);
    },
    [history]
  );

  // Undo placeholder
  const undoDeletion = useCallback(
    async (item: ForecastHistoryItem) => {
      Toast.show({
        position: "top",
        type: "success",
        text1: "Success",
        visibilityTime: 5000,
        text2: "Press this pop up to UNDO the action, you have 5 seconds to decide.",
        onPress: () => setHistoryEntry(item),
      });
    },
    [setHistoryEntry]
  );

  const deleteItem = useCallback(
    async (key: string) => {
      const newHistory = history.filter((item) => item.key !== key);
      await saveHistory(newHistory);
      await undoDeletion(
        history.find(({ key: deleteKey }) => {
          return key === deleteKey;
        })!
      );
    },
    [history, undoDeletion]
  );
  return { history, setHistoryEntry, deleteItem };
};
