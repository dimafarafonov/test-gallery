import { useCallback, useState } from "react";
import { getForecast } from "..";

export type TodaysForecast = Awaited<ReturnType<ReturnType<typeof useForecast>["getTodaysForecast"]>>;

export const useForecast = ({ city }: { city: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getTodaysForecast = useCallback(async () => {
    setIsLoading(true);
    const data = await getForecast({ city }).finally(() => setIsLoading(false));
    if (!data) {
      return {
        forecast: null,
      };
    }

    const {
      location: { country, name },
      current: { temp_c, wind_kph, condition },
      forecast: {
        forecastday: [{ day }],
      },
    } = data;

    const { maxtemp_c, mintemp_c } = day;

    return {
      forecast: {
        country,
        name,
        temp_c,
        maxtemp_c,
        mintemp_c,
        wind_kph,
        condition,
      },
    };
  }, [city]);

  return { getTodaysForecast, isLoading };
};
