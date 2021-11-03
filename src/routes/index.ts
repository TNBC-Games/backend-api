import express from 'express';
import glob from 'glob';

const router = express.Router();
/**
 * Configure all the services with the express application
 */
    glob.sync('*.ts', {
        cwd: __dirname,
        ignore: 'index.ts'
    })
    .forEach((file: any) => {
        const fileRoutes = require(`./${file}`).default;
        router.use(fileRoutes.baseUrl, fileRoutes.router);
    });

export default router;
