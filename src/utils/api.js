const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export const fetchIncomeStatements = async () => {
  const response = await fetch(`${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();
  return data.map(item => ({
    date: item.date,
    revenue: item.revenue,
    netIncome: item.netIncome,
    grossProfit: item.grossProfit,
    eps: item.eps,
    operatingIncome: item.operatingIncome,
  }));
};
