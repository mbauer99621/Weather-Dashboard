# Weather Dashboard

A weather dashboard application built with Node.js that allows users to get current weather and forecast data based on a city name. The application uses the OpenWeather API to fetch weather data.

## Features

- Get current weather information (temperature, humidity, pressure, description) for a city.
- Filter and display weather forecasts for noon (12:00 PM).
- Fetch weather data using the city name and geographical coordinates (latitude and longitude).
- Built with TypeScript, `node-fetch`, and `dotenv` to manage environment variables.

## Technologies Used

- **Node.js** - JavaScript runtime
- **TypeScript** - Typed superset of JavaScript
- **node-fetch** - Lightweight HTTP request library
- **dotenv** - Loads environment variables from a `.env` file
- **OpenWeather API** - External API used for fetching weather data

## Installation

### Prerequisites

Ensure that you have Node.js and npm (Node Package Manager) installed on your machine. If not, you can download and install them from [nodejs.org](https://nodejs.org/).

### Steps to Install

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
2. Navigate to the project folder::
   ```bash
   cd weather-dashboard
3. Install the dependencies:
   ```bash
   npm install
4. Create a .env file in the root of the project and add the following environment variables
   ```bash
   API_BASE_URL=https://api.openweathermap.org/data/2.5
   API_KEY=your-api-key

### Usage

Interact with the page by entering a city in to the search box.

### Acknowledgments

OpenWeather API for providing weather data.
Node.js and TypeScript for enabling the development of this application.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.








