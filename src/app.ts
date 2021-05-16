import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { LifoRoute, KeyValueRoute } from './routes';
import { appConfig } from './config';
import { MainInstance } from './mainInstance';
import { KeyValueService, LifoService } from './services';

const app = express();
const mainInstance = new MainInstance();
const lifoRoute = new LifoRoute(new LifoService(mainInstance.lifoModel));
const keyValueRoute = new KeyValueRoute(new KeyValueService(mainInstance.keyValueModel));

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')));

app.use('/lifo', lifoRoute.route());
app.use('/key-value', keyValueRoute.route());

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (e, req, res, next) {
    res.locals.message = e.message;
    res.locals.error = req.app.get('env') === 'development' ? e : {};

    res.status(e.status || 500);
    res.json({
        message: e.message,
        error: e
    });
});

app.listen(appConfig.port, () => {
    console.log(`Server Started at Port, ${ appConfig.port }`);
});

export default app;
