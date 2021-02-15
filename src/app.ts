import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import stackRoute from './routes/stackRoute';
import storageRoute from './routes/storageRoute';

const app = express();
const port: number = 3000;

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')));

app.use('/stack', stackRoute);
app.use('/storage', storageRoute);

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

app.listen(port, () => {
    console.log(`Server Started at Port, ${ port }`);
});

export default app;
