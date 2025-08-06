export const formatoMoneda = (monto: number) => {
    return Intl.NumberFormat("en-MX", {
        style: "currency",
        currency: "MXN"
    }).format(monto);
}

export const formatoFecha = (updatedAt: string) => {
    const fecha = new Date(updatedAt);
    return Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(fecha);
}