import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import lifoRoute from './routes/lifoRoute';
import keyValueRoute from './routes/keyValueRoute';
import { appConfig } from './config';

const app = express();

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')));

app.use('/lifo', lifoRoute);
app.use('/key-value', keyValueRoute);

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
