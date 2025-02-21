export async function convertUSDToEUR(amount) {
    const rate = await fetchExchangeRate();
    return amount * rate;
}

async function fetchExchangeRate() {
    return 0.85;
}