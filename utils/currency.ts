

export const format = ( value: number ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format( value ); //L 2,500.00
}


// Crear formateador para dolar
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
// })