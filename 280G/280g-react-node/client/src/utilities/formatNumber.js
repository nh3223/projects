export const formatNumber = (number, decimalPlaces = 2) => number.toLocaleString('en-US', { 
  style: 'decimal', 
  minimumFractionDigits: decimalPlaces
});

export const formatDollar = (number, decimalPlaces = 2) => `$${number.toLocaleString('en-US', {
  style: 'decimal',
  currency: 'USD',
  minimumFractionDigits: decimalPlaces
})}`;