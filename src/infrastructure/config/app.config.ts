export default () => ({
    app: {
        name: process.env.APP_NAME,
        port: parseInt(process.env.APP_PORT ?? '3000', 10),
        env: process.env.APP_ENV,
        prefix: process.env.API_PREFIX,
    },
});