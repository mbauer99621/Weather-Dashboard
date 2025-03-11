import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { cityName } = req.body;  // Assuming city name comes from the request body
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }
  try {
    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // Save city and weather data to search history
    await HistoryService.saveCityToHistory(cityName);

    res.status(200).json(weatherData); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id); // Updated method name here to match HistoryService
    res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove city from history' });
  }
});

export default router;
