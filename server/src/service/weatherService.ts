import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public temperature: number,
    public humidity: number,
    public pressure: number,
    public description: string
  ) {}
}

class WeatherService {
  // TODO: Define the base URL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.OPENWEATHER_API_KEY!;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    const geocodeQuery = this.buildGeocodeQuery(query);
    try {
      const response = await fetch(geocodeQuery);
      const data = await response.json();
  
      // Ensure that data is an array and contains items
      if (Array.isArray(data) && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon,
        };
      } else {
        return null; // Return null if no valid data
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }
  

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates | null> {
    const locationData = await this.fetchLocationData(query);
    if (locationData) {
      return this.destructureLocationData(locationData);
    }
    return null;
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any | null> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    try {
      const response = await fetch(weatherQuery);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const { main, weather } = response;
    const temperature = main.temp;
    const humidity = main.humidity;
    const pressure = main.pressure;
    const description = weather[0].description;
    return new Weather(temperature, humidity, pressure, description);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    let weatherArray = [currentWeather];  // Start with current weather
    let filteredData = weatherData.filter((data: any) => data.dt_txt.includes('12:00:00')); // Filter to include only the noon forecasts

    filteredData.forEach((item: any) => {
      weatherArray.push(
        new Weather(
          item.main.temp,
          item.main.humidity,
          item.main.pressure,
          item.weather[0].description,
        )
      );
    });

    return weatherArray;
  }


  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather | null> {
    const locationData = await this.fetchAndDestructureLocationData(city);
    if (locationData) {
      const weatherData = await this.fetchWeatherData(locationData);
      if (weatherData) {
        return this.parseCurrentWeather(weatherData);
      }
    }
    return null;
  }
}

export default new WeatherService();
