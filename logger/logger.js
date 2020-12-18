/**
 * Project Name : BunkatsuKun
 * 
 * @author      Keit-oDama
 * @date        Dec 18, 2020
 * @description Logライブラリ
 * 
 */

const winston = require('winston');
require('winston-daily-rotate-file');

const disable_debug_mode = false;
const directoryName = 'log/%DATE%';

const transport_debug = new (winston.transports.DailyRotateFile)({
  name: 'debug-file',
  filename: `${directoryName}/debug-%DATE%`,
  datePattern: 'YYYY-MM-DD',
  level: 'debug',
  silent: disable_debug_mode,
  maxSize: '10m',
  maxFiles: '7d',
  extension: '.log', 
  zippedArchive: true
});

const transport_info = new (winston.transports.DailyRotateFile)({
  name: 'info-file',
  filename: `${directoryName}/info-%DATE%`,
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  maxSize: '10m',
  maxFiles: '7d',
  extension: '.log', 
  zippedArchive: true
});

const transport_error = new (winston.transports.DailyRotateFile)({
  name: 'error-file',
  filename: `${directoryName}/error-%DATE%`,
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '10m',
  maxFiles: '7d',
  extension: '.log', 
  zippedArchive: true
});

global.logger = new (winston.createLogger)({

  format:winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json(),
    winston.format.printf(info => {
        return `${info.timestamp};[${info.level.toUpperCase()}];${(info.message)}`;
      })
),
  transports: [
      transport_debug,
      transport_info,
      transport_error,
  ],
});