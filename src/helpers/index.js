export const formatCurrency = cantidad => {
    return cantidad.toLocaleString('es-MX',{style:'currency',currency:'MXN'})
}