
//Replace with an API call to a list of currencies around the world
export interface Currency {
  fullName: string;
  symbol: string;
};
  
export const currencies: Record<string, Currency> = {
    'USD': { fullName: 'United States Dollar', symbol: '$' },
    'EUR': { fullName: 'Euro', symbol: '€' },
    'GBP': { fullName: 'British Pound Sterling', symbol: '£' },
    'UGX': { fullName: 'Ugandan Shilling', symbol: 'UGX' },
    // Add more currencies as needed
};

//Replace with an API call to a list of exchange rates around the world
export interface ExchangeRate {
    dollarValue: number;
};

export const exchangeRates: Record<string, number> = {
    'USD': 1,
    'EUR': 1.08,
    'GBP': 1.26,
    'UGX': 0.00026,
    // Add more exchange rates as needed
};