import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the City class with name, id, and weather data properties
class City {
  constructor(public id: string, public name: string) {}
}

// Define the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.filePath = path.join(__dirname, '../../db/db.json');
    
  }

  // Read data from the JSON file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      const parsedData = JSON.parse(data);
      return parsedData.cities || []; 
    } catch (error) {
      console.error('Error reading from file:', error);
      return [];
    }
  }

  // Write data to the JSON file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify({ cities }, null, 2); 
      await fs.promises.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  // Get the list of cities from history
  async getHistory(): Promise<City[]> {
    return this.read();
  }

  // Add a city to the history
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(Date.now().toString(), cityName); 
    cities.push(newCity); // Add the new city to the cities array
    await this.write(cities);
  }

  // Save city along with weather data to history
  async saveCityToHistory(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(Date.now().toString(), cityName); 
    cities.push(newCity); // Add the new city and its weather data to the array
    await this.write(cities);
  }

  // Remove a city from the history
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id); // Removes the city
    await this.write(updatedCities); 
  }
}

export default new HistoryService();
