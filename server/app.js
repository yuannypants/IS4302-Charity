import path from "path"
import app from './config/express';
import proxy from 'express-http-proxy';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.config.dev';

import apiRouter from './routes';
import * as errorHandler from './middlewares/errorHandler';

// If we are developing, enable Webpack hot reloading for faster development times
if (process.env.MODE === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

// Reverse proxy for blockchain
app.use('/bc', proxy(() => {
  console.log('Single-user blockchain API call received.');
  return 'localhost:3001/';
}))
// Reverse proxy for blockchain
app.use('/bc2', proxy(() => {
  console.log('Multi-user blockchain API call received.');
  return 'localhost:3001/';
}))

// Router for server API
app.use('/api', apiRouter);

// Router for frontend
app.get('*', (req, res) => { res.sendFile(path.join(process.cwd(), 'public/index.html')) });

// If URL doesn't match any router paths, pass to error handlers
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.errorHandler);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
  });

export default app;
