const mockItems = [
  { key: "kyiv", label: "Kyiv" },
  { key: "london", label: "London" },
  { key: "paris", label: "Paris" },
  { key: "new_york", label: "New York" },
  { key: "tokyo", label: "Tokyo" },
  { key: "sydney", label: "Sydney" },
  { key: "berlin", label: "Berlin" },
  { key: "madrid", label: "Madrid" },
  { key: "moscow", label: "Moscow" },
  { key: "rio", label: "Rio de Janeiro" },
  { key: "cape_town", label: "Cape Town" },
];
export const useForecastHistory = () => {
  return { history: mockItems };
};
