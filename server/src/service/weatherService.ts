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
  private baseURL: string = process.env.API_BASE_URL || "";
  private apiKey: string = process.env.API_KEY || "";
  private cityName: string = "";

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    try {
      const response = await fetch(query);
      const data: any = await response.json();
      return (data[0] as Coordinates);
    } catch (error) {
      //throw error to getWeatherForCity
      throw(error);
      
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
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/weather?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    try {
      const query = this.buildGeocodeQuery();
      const locationData = await this.fetchLocationData(query);
      return this.destructureLocationData(locationData);
      
    } catch (error) {
      console.error("Failed to get location data");
      
    }
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
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
  async getWeatherForCity(city: string): Promise<Weather | {}>  {
    try {
      this.cityName = city;
      const locationData = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(locationData);
      return this.parseCurrentWeather(weatherData);

    } catch (error) {
      //throw error to weatherRoutes
      console.error(error);
      throw(error);
    }
  }
}

export default new WeatherService();
