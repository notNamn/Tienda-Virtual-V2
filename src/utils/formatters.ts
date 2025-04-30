export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(amount);
};

// const formattedDate = sale?.createdAt ? new Date(sale.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
export const formattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};