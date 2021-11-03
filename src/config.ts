import abi from './contracts/abi.json';

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
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    database: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/tnbc'
    },
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || 'logs/error.log'
    },
    mail: {
        key: process.env.MAIL_KEY || '1234',
        domain: process.env.MAIL_DOMAIN || '',
        user: process.env.GMAIL_USER || '',
        password: process.env.GMAIL_PASS || ''
    },
    ETH: {
        token: process.env.ETH_TOKEN || '',
        abi,
        gas: 60000,
        gasPrice: 10
    },
    CARD: {
        url: process.env.CARD_URL || 'https://sandbox.spendjuice.com/',
        key: process.env.CARD_KEY || ''
    }
};
