Weather Mobile 🌦️

A simple mobile app built with React, Expo, and WeatherAPI that allows users to search for city weather forecasts, view search history, and manage previously searched cities.

🚀 Features
🌡️ View the current temperature, weather description (e.g., Sunny, Rainy), min/max temperatures, and wind speed.
🏙️ Search weather data for any city.
📜 Keep a history of previously searched cities.
🔄 Re-fetch weather data by selecting a city from history.
❌ Remove history items.
↩️ Undo a remove action

🛠️ Tech Stack

React (with Expo for mobile development)
JavaScript (TypeScript support optional)
CSS frameworks as needed
WeatherAPI (for weather data)

📦 Getting Started
1. Clone the repository
git clone https://github.com/dimafarafonov/test-tasks/tree/main/weather-mobile
cd weather-mobile

2. Install dependencies
yarn install

3. Environment variables

Create a .env.local file in the root directory based on .env.example.
You must add your WeatherAPI key like this:

EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here


👉 To obtain an API key, register at WeatherAPI.com
.

🧑‍💻 Development
Run the project locally:
yarn dev


Platform-specific runs:
Android: yarn run android
iOS: yarn run ios
Web: yarn run web
Lint your code:
yarn run lint

📱 Deployment

We recommend using EAS Build to automate builds for iOS and Android.
For now, this README assumes local development only.

✅ User Stories (Implemented / Planned)
 View weather forecast for a submitted city
 Display current temp, weather description, min/max temp, wind speed
 Keep a history of searched cities
 Fetch weather data from history items
 Remove history items
 Undo remove action (optional)
📄 License

This project is licensed under the MIT License.

(docs are written with help of AI for the sake of saving some time)