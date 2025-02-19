function median(arr) {
    if (arr.length === 0) return null;
    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}

module.exports = median;