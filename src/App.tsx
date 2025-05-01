import { useState, useEffect } from 'react';
import { StockData } from './types/stock';
import { fetchStockData } from './services/stockService';
import ReactApexChart from 'react-apexcharts';

const DEFAULT_STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSymbol, setNewSymbol] = useState('');

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        const stockData = await Promise.all(
          DEFAULT_STOCKS.map(symbol => fetchStockData(symbol))
        );
        setStocks(stockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStocks();
  }, []);

  const handleAddStock = async () => {
    if (!newSymbol.trim()) return;
    
    try {
      setError(null);
      const symbol = newSymbol.trim().toUpperCase();
      
      // Check if stock already exists
      if (stocks.some(stock => stock.symbol === symbol)) {
        setError(`Stock ${symbol} is already in the list.`);
        return;
      }

      const newStock = await fetchStockData(symbol);
      setStocks(prevStocks => [...prevStocks, newStock]);
      setNewSymbol('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stock. Please try again.');
    }
  };

  const handleRemoveStock = (symbolToRemove: string) => {
    setStocks(prevStocks => prevStocks.filter(stock => stock.symbol !== symbolToRemove));
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
    },
    series: [{
      name: 'Price',
      data: stocks.map(stock => stock.price),
    }],
    xaxis: {
      categories: stocks.map(stock => stock.symbol),
    },
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Stock Dashboard</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stocks..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="add-stock-container">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., TSLA)"
          className="search-input"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
        />
        <button 
          className="add-button"
          onClick={handleAddStock}
        >
          Add Stock
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && stocks.length > 0 && (
        <>
          <div className="stock-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>Change %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.symbol}>
                    <td>{stock.symbol}</td>
                    <td>${stock.price.toFixed(2)}</td>
                    <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </td>
                    <td className={stock.changePercent >= 0 ? 'positive' : 'negative'}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveStock(stock.symbol)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="chart-container">
            <h2 className="chart-title">Price Chart</h2>
            <ReactApexChart
              options={chartOptions}
              series={chartOptions.series}
              type="line"
              height={350}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
