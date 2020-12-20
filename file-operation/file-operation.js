/**
 * Project Name : BunkatsuKun
 * 
 * @author      Keit-oDama
 * @date        Dec 12, 2020
 * @description ファイル操作ライブラリ
 * 
 */

'use strict';   // 処理を厳格にする
const fs = require('graceful-fs');      // ERROR:Too many open filesを回避できるfs / 参考(http://dotnsf.blog.jp/archives/1064268194.html)
const readline = require('readline');
const path = require('path');
const mainDirectory = path.dirname(process.argv[1]);

/**
 * @description 分割したファイルを格納するフォルダの作成
 * @param  {String} filePath ファイルパス
 */
const splitMkdir = (filePath) => {
    // 格納先フォルダが既に存在していたら削除してから作成
    if (fs.existsSync(filePath)) {
        fs.rmdirSync(filePath, { recursive: true });
    }
    fs.mkdirSync(filePath);
    logger.info(message.MAKE_DIRECTORY_SUCCESS(filePath));
}

/**
 * @description 分割したファイルを格納するフォルダの作成
 * @param  {String} filePath ファイルパス
 * @param  {Number} lineLimit 分割行数
 * @param  {}       callback コールバック関数
 */
const countSplitFile = (filePath, lineLimit, callback) => {
    const rs = fs.createReadStream(filePath);
    let rawCount = 0;
    rs.on('data', (chunk) => {
        // ファイル読み込みに失敗したら終了
        if (!chunk) {
            logger.error(message.READ_FILE_FAILURE);
            console.log(message.READ_FILE_FAILURE);
            return;
        }
        // 行数カウント
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] == 10) {
                rawCount++;
            }
        }
    });
    rs.on('end', (chunk) => {
        rawCount++;
        const fileCount = Math.ceil(rawCount/lineLimit);
        logger.info(message.READ_FILE_COUNT_SUCCESS);
        // ファイルの分割スタート
        callback(filePath, lineLimit, fileCount);
    });
}

/**
 * @description 分割したファイルを格納するフォルダの作成
 * @param  {String} filePath ファイルパス
 * @param  {Number} lineLimit 分割行数
 * @param  {Number} fileCount 分割ファイル数
 */
const splitFileReadLine = (filePath, lineLimit, fileCount) => {
    // 分割ファイル数が上限(1000)を超えたら終了
    const fileLimit = 1000;
    if (fileCount > fileLimit) {
        logger.error(message.LIMIT_FILE_COUNT(fileCount, fileLimit));
        console.log(message.LIMIT_FILE_COUNT(fileCount, fileLimit));
        return;
    }
    logger.info(message.SPLIT_FILE_COUNT(fileCount));

    // 格納先フォルダ作成
    const directoryPrefix = 'Bunkatsu-';
    const fileName = path.basename(filePath);
    const directoryName = `${directoryPrefix}${fileName}`;
    const directoryPath = `${mainDirectory}\\${directoryName}`;
    splitMkdir(directoryPath);

    // 1行ずつ読み込み＆lineLimitだけ読み込んだら書き込み
    console.clear();
    const rs = fs.createReadStream(filePath, 'utf8');
    const rl = readline.createInterface(rs, {});
    const extension = path.extname(fileName);
    const onlyFileName = path.basename(filePath, extension);
    let n = 0;
    let tmpN = 0;
    let dataBuf = '';
    let fileNumber = 0;
    rl.on('line', chunk => {
        dataBuf = `${dataBuf}${chunk}\n`;
        n++;
        if (n == lineLimit) {
            tmpN = tmpN + n;
            let ws = fs.createWriteStream(`${directoryPath}\\${onlyFileName}-${tmpN / lineLimit}${extension}`, 'utf8');
            ws.write(dataBuf, (err) => {
                fileNumber++;
                if (err) {
                    logger.error(message.WRITE_FILE_FAILURE(`${onlyFileName}-${fileNumber}${extension}`));
                    console.log(message.WRITE_FILE_FAILURE(`${onlyFileName}-${fileNumber}${extension}`));
                    return;
                }
                logger.info(message.WRITE_FILE_SUCCESS(`${onlyFileName}-${fileNumber}${extension}`));
                require('readline').cursorTo(process.stdout, 0, 0);
                process.stdout.write(message.SPLITING_FILE(fileNumber, fileCount));
            });
            n = 0;
            dataBuf = '';
        }
    });

    // 最終行に到達したら最後に溜まっているdataを吐き出して終了
    rl.on('close', () => {
        let ws = fs.createWriteStream(`${directoryPath}\\${onlyFileName}-${(tmpN / lineLimit) + 1}${extension}`, 'utf8');
        ws.write(dataBuf, (err) => {
            fileNumber++;
            if (err) {
                logger.error(message.WRITE_FILE_FAILURE(`${onlyFileName}-${fileNumber}${extension}`));
                console.log(message.WRITE_FILE_FAILURE(`${onlyFileName}-${fileNumber}${extension}`));
            return;
            }
            logger.info(message.WRITE_FILE_SUCCESS(`${onlyFileName}-${fileNumber}${extension}`));
            require('readline').cursorTo(process.stdout, 0, 0);
            process.stdout.write(message.SPLITING_FILE(fileNumber, fileCount));
            logger.info(message.FINISH_SPILIT_FILE);
            console.log('ファイルの分割が完了しました。');
        });
        n = 0;
        dataBuf = '';
    });
}

module.exports = {
    /**
     * @description ファイルを分割。分割ファイル数上限 = 1000。
     * @param  {String} filePath ファイルパス
     * @param  {Number} lineLimit 分割行数
     */
    splitFile: (filePath, lineLimit) => {
        // 作成ファイル数を計算
        countSplitFile(filePath, lineLimit, splitFileReadLine);
    },
}