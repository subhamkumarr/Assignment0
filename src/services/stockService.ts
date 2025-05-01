import axios from 'axios';
import { StockData, StockResponse } from '../types/stock';

const API_KEY = '7H63DFC727UIUD0O';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol: string): Promise<StockData> => {
  try {
    const response = await axios.get<StockResponse>(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY,
      },
    });

    if (!response.data['Global Quote']) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }

    const quote = response.data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Alpha Vantage API key.');
      }
    }
    console.error('Error fetching stock data:', error);
    throw new Error(`Failed to fetch data for ${symbol}. Please try again later.`);
  }
}; 