# Stock Price Dashboard 📈

A modern, responsive stock price dashboard built with React, TypeScript, and CSS. This application provides real-time stock data visualization with an interactive interface.

![Stock Dashboard Preview](https://i.imgur.com/placeholder.png)

## ✨ Features

- **Real-time Stock Data**: Fetch and display current stock prices and changes
- **Interactive Search**: Search through existing stocks
- **Add/Remove Stocks**: Dynamically add or remove stocks from your watchlist
- **Price Chart**: Visual representation of stock prices using ApexCharts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful error handling for API failures and invalid inputs
- **Loading States**: Smooth loading animations for better UX

## 🚀 Live Demo

[View Live Demo](https://your-demo-link.com)

## 🛠️ Technologies Used

- React 18
- TypeScript
- Axios for API calls
- ApexCharts for data visualization
- Alpha Vantage API for stock data
- Modern CSS with Flexbox and Grid

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alpha Vantage API key (free tier available at [Alpha Vantage](https://www.alphavantage.co/))

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subhamkumarr/Assignment0.git
   cd Assignment0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Alpha Vantage API key:
   ```
   VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 💻 Usage

1. **View Default Stocks**: The dashboard initially displays data for major tech companies (AAPL, MSFT, GOOGL, AMZN, META)

2. **Search Stocks**: Use the search bar to filter through your watchlist

3. **Add New Stocks**: 
   - Enter a stock symbol (e.g., TSLA, NVDA, NFLX)
   - Click "Add Stock" or press Enter
   - The stock will be added to your watchlist

4. **Remove Stocks**: Click the "Remove" button next to any stock to remove it from your watchlist

5. **View Price Chart**: The chart automatically updates to show prices for all stocks in your watchlist

## 📱 Supported Stock Symbols

The application supports any valid stock symbol from major exchanges. Some popular examples:
- TSLA (Tesla)
- NVDA (NVIDIA)
- NFLX (Netflix)
- DIS (Disney)
- MCD (McDonald's)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Subham Kumar**
- GitHub: [@subhamkumarr](https://github.com/subhamkumarr)

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing the stock data API
- [ApexCharts](https://apexcharts.com/) for the charting library
- [React](https://reactjs.org/) for the amazing framework
