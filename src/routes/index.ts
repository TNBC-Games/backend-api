import express from 'express';
import config from '../config';
// import glob from 'glob';
var glob = require('glob');

const router = express.Router();
const patt = config.type ==='ts'? '*.ts':'*.js';
const ignore = config.type ==='ts'? 'index.ts': 'index.js';
/**
 * Configure all the services with the express application
 */
    // glob.sync('*.ts', {
    //     cwd: __dirname,
    //     ignore: 'index.ts'
    // })
    // .forEach((file: any) => {
    //     const fileRoutes = require(`./${file}`);
    //     console.log(fileRoutes);
    //     router.use(fileRoutes.baseUrl, fileRoutes.router);
    // });
    glob(patt, {
            cwd: __dirname,
            ignore
        }, (err:any, files:any) => {
        if (err) {
            console.log(err);
        } else {
            console.log('--->', files);
            for(var i=0; i<files.length; i++){
                const file = files[i];
                const fileRoutes = require(`./${file}`).default;
                router.use(fileRoutes.baseUrl, fileRoutes.router);
            }
        }
    });

export default router;
