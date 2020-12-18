/**
 * Project Name : BunkatsuKun
 * 
 * @author      Keit-oDama
 * @date        Dec 14, 2020
 * @description エントリーポイント
 * 
 */

'use strict';   // 処理を厳格にする

// モジュール読み込み
const fileOperation = require('./file-operation/file-operation.js');
const message = require('./message/message.js');
const propertiesReader = require('properties-reader');
const fs = require('fs');
const path = require('path');
require('./logger/logger.js');


// コマンドライン引数から分割したいファイルのパスを取得
let filePath = process.argv[2];


// ファイルが存在しなければ終了
if (typeof filePath === "undefined") {
    logger.error(message.NO_SPLITTABLE_FILES_FOUND);
    throw new Error(message.NO_SPLITTABLE_FILES_FOUND);
}


// 対象外のファイルなら終了
const extention = path.extname(filePath);
const regex = /.txt|.csv/gi;
if (!regex.test(extention)) {
    logger.error(message.OUT_OF_TARGET_FILES);
    throw new Error(message.OUT_OF_TARGET_FILES);
}
logger.info(`${filePath} ${message.SUCCESS_READ_FILE}`);


// 設定ファイル読み込み
const settingFilePath = `${__dirname}\\settings.ini`;
if (!fs.existsSync(settingFilePath)) { //ファイルが存在しないなら終了
    logger.error(message.NOT_FOUND_SETTINGFILES);
    throw new Error(message.NOT_FOUND_SETTINGFILES);
}
const properties = propertiesReader(settingFilePath);
const lineLimit = properties.get('settings.lineLimit');
logger.info(`${settingFilePath} ${message.SUCCESS_READ_FILE}`);


// ファイル分割
logger.info(`${message.START_SPILIT_FILE}${lineLimit}行ごとにファイルを分割します。`);
console.log(`${filePath} を分割中...`);
fileOperation.splitFile(filePath, lineLimit);