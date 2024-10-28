import { Stock } from './types.ts';

export class Portfolio {
  private stocks: Stock[];

  constructor(stocks: Stock[] = []) {
    this.stocks = stocks;
  }

  profit(startDate: Date, endDate: Date): number {
    let initialTotal = 0;
    let finalTotal = 0;

    for (const stock of this.stocks) {
      const stockStartingPrice = stock.price(startDate);
      const stockEndingPrice = stock.price(endDate);
      if (stockStartingPrice == null || stockEndingPrice == null) continue;
      initialTotal += stockStartingPrice;
      finalTotal += stockEndingPrice;
    }

    return finalTotal - initialTotal;
  }

  annualizedReturn(startDate: Date, endDate: Date): number {
    const profit = this.profit(startDate, endDate);
    let initialTotal = 0;

    for (const stock of this.stocks) {
      const stockStartingPrice = stock.price(startDate);
      if (stockStartingPrice == null) continue;
      initialTotal += stockStartingPrice;
    }

    const days = this.calculateDaysBetween(startDate, endDate);
    const years = Math.floor(days / 365);
    const negativeProfit = profit < 0;
    
    return years > 0 ? (Math.pow(1 + profit / initialTotal, 1 / years) - 1) * (negativeProfit ? -1 : 1) : 0;
  }

  private calculateDaysBetween(startDate: Date, endDate: Date): number {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
