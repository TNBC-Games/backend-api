export default {
    port: process.env.PORT || '9090',
    instance: process.env.INSTANCE_ID || '1',
    node_version: process.version,
    env: process.env.NODE_ENV || 'development',
    type: process.env.BUILD_TYPE || 'ts',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret1',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'secret2',
    verifyEmailSecret: process.env.VERIFY_EMAIL_SECRET || 'vfesecret',
    accessTokenExp: '4d',
    refreshTokenExp: '1y',
    verifyEmailExp: '15m',
    KEY: '12345',
    GOOGLE_CALLBACK_URL: '/v1/auth/google/redirect',
    GOOGLE_CLIENT_ID: '397297913799-jjj5mpb062nlqcsvohuae4rnpj3ikik8.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    DISCORD_CALLBACK_URL: '/v1/auth/discord/redirect',
    DISCORD_CLIENT_ID: '905550154466217984',
    DISCORD_CLIENT_SECRET: 'AJ6gvd3ajcNfAbCGW4QIPcIVzyiwgmY6',
    database: {
        url: process.env.DB_URL || 'mongodb+srv://leo:leo_0987@tnbc.xymbs.mongodb.net/TNBC?retryWrites=true&w=majority'
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || 'logs/error.log'
    }
};
