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
global.message = require('./message/message.js');
const propertiesReader = require('properties-reader');
const fs = require('fs');
const path = require('path');
require('./logger/logger.js');


// コマンドライン引数から分割したいファイルのパスを取得
let filePath = process.argv[2];


// ファイルが存在しなければ終了
if (typeof filePath === "undefined") {
    logger.error(message.NO_SPLITTABLE_FILES_FOUND);
    console.log(message.NO_SPLITTABLE_FILES_FOUND);
    return;
}


// 対象外のファイルなら終了
const extention = path.extname(filePath);
const regex = /.txt|.csv/gi;
if (!regex.test(extention)) {
    logger.error(message.OUT_OF_TARGET_FILES);
    console.log(message.OUT_OF_TARGET_FILES);
    return;
}
logger.info(`${filePath} ${message.READ_FILE_SUCCESS}`);


// 設定ファイル読み込み
const settingFilePath = `${__dirname}\\settings.ini`;
if (!fs.existsSync(settingFilePath)) { //ファイルが存在しないなら終了
    logger.error(message.NOT_FOUND_SETTINGFILES);
    console.log(message.NOT_FOUND_SETTINGFILES);
    return;
}
const properties = propertiesReader(settingFilePath);
const lineLimit = properties.get('settings.lineLimit');
logger.info(`${settingFilePath} ${message.READ_FILE_SUCCESS}`);


// ファイル分割
logger.info(`${message.START_SPILIT_FILE}`);
fileOperation.splitFile(filePath, lineLimit);