import { SERVICE_CONFIG } from "@/configs";
import { Alert } from "react-native";
import { WeatherBase } from "./types";

type Error = { error: { code: number; message: string } };

export const getForecast = async ({ city }: { city: string }) => {
  try {
    const response = await fetch(
      `${SERVICE_CONFIG.weatherService.url}forecast.json?q=${city}&days=1&key=${SERVICE_CONFIG.weatherService.key}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    const data = (await response.json()) as WeatherBase;

    if (data.hasOwnProperty("error")) {
      return Alert.alert((data as unknown as Error).error?.message);
    }
    return data || null;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
