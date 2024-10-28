import { Portfolio } from "./portfolio";
import { Stock } from "./types";

const fakeStock: Stock = {
  price: (date: Date) => Math.abs(date.getFullYear() - 2000) * 100 || 1
};

const portfolio = new Portfolio([fakeStock]);

console.log('Profit between 2001-01-01 and 2003-01-01:', portfolio.profit(new Date(2001, 0, 1), new Date(2003, 0, 1)));
console.log('Annualized return between 2001-01-01 and 2003-01-01:', portfolio.annualizedReturn(new Date(2001, 0, 1), new Date(2003, 0, 1)));
