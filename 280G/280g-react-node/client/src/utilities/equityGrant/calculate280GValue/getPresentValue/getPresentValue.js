export const getPresentValue = (payment, afr, { days }) => payment / (1 + afr)**days;