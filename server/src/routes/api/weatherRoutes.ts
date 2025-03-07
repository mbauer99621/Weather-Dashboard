import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
//import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { city } = req.body;  // Assuming city name comes from the request body
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // GET weather data from city name
    const apiKey = '71d9c97b3ac1a50483f88098643dc879'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    
    // Check if the city is found
    if (!response.ok) {
      return res.status(response.status).json({ error: 'City not found' });
    }

    const weatherData = await response.json();

    // Save city and weather data to search history
    await HistoryService.saveCityToHistory(city, weatherData);

    res.status(200).json(weatherData); // Send weather data as response
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
