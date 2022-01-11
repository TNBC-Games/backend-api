import config from './config';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
});

export { cloudinary };
