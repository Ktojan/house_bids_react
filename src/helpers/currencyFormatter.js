export const currencyFormatter = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    useGrouping: true,
})
