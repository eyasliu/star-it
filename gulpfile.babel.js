import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'nodemon';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import run from 'run-sequence';

// config
import env from './config/env';
import clientDev from './config/client.dev';
import clientPro from './config/client.pro';
import serverConfig from './config/server';

// dev
gulp.task('dev', ['dev:client', 'dev:server'])

// server dev
gulp.task('dev:server', ['watch:server'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: './build/server.js',
    ignore: ['*'],
    ext: 'noop'
  }).on('restart', () => {
    console.log('restart server ok.');
  })
})

// watch server
gulp.task('watch:server', () => {
  webpack(serverConfig).watch(100, (err, stats) => {
    console.log(stats.toString({
      chunks: false,
      colors: true,
    }));
    run('lint');
    !err && nodemon.restart();
  })
})


gulp.task('dev:client', () => {
  const compiler = webpack(clientDev);

  new WebpackServer(compiler, {
    contentBase: './',
    publicPath: clientDev.output.publicPath,
    hot: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  }).listen(env.clientPort, env.host, (err, stats) => {
    if (err) console.log(err);
    console.log(`webpack was listenning: http://${env.host}:${env.clientPort}`);
  })
})

// lint
gulp.task('lint', () => {
  gulp
    .src([
      './*.js',
      'app/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.formatEach())
})