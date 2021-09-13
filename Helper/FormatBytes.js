const formatBytes = (a, b = 2, k = 1024) => {
    const d = Math.floor(Math.log(a) / Math.log(k));
    return a === 0
        ? '0 Bytes'
        : `${parseFloat((a / k ** d).toFixed(Math.max(0, b)))} ${
                ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
            }`;
};

module.exports = formatBytes;