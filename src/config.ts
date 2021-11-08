export default {
    port: process.env.PORT || '9090',
    instance: process.env.INSTANCE_ID || '1',
    node_version: process.version,
    env: process.env.NODE_ENV || 'development',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret1',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'secret2',
    verifyEmailSecret: process.env.VERIFY_EMAIL_SECRET || 'vfesecret',
    accessTokenExp: '4d',
    refreshTokenExp: '1y',
    verifyEmailExp: '15m',
    KEY: '12345',
    CALLBACK_URL: '/v1/auth/google/redirect',
    CLIENT_ID: '397297913799-jjj5mpb062nlqcsvohuae4rnpj3ikik8.apps.googleusercontent.com',
    CLIENT_SECRET: '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',
    database: {
        url: process.env.DB_URL || 'mongodb+srv://leo:leo_0987@tnbc.xymbs.mongodb.net/TNBC?retryWrites=true&w=majority'
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || 'logs/error.log'
    }
};
