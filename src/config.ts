export default {
    port: process.env.PORT || '9090',
    instance: process.env.INSTANCE_ID || '1',
    node_version: process.version,
    env: process.env.NODE_ENV || 'development',
    type: process.env.BUILD_TYPE || 'ts',
    superAdminPassword: process.env.SUPER_ADMIN_PASS || '123456',
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL || 'leo247@gmail.com',
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
    baseUrl: process.env.BASE_URL || 'http://localhost:9090/v1',
    cloudinary_cloud_name: process.env.CLOUD_NAME || 'tnbcgames-com',
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || '437354955832423',
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || '0pqY8LkIZ6DXTeX8US3lKBmXKCw',
    tnbAccountNumber: 'bcd9d09b5d1093a39797bc0647434beaf11578412340440a8b0ff91ef440f536',
    database: {
        url: process.env.DB_URL || 'mongodb+srv://leo:leo_0987@tnbc.xymbs.mongodb.net/TNBC?retryWrites=true&w=majority'
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || 'logs/error.log'
    }
};
