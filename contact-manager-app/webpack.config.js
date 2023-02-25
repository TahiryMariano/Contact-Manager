module.exports = {
    resolve: {
        fallback: {
            "util": { "util": require.resolve("util/") },
        }
    }
}