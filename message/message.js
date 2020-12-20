/**
 * Project Name : BunkatsuKun
 * 
 * @author      Keit-oDama
 * @date        Dec 13, 2020
 * @description メッセージライブラリ
 * 
 */

'use strict';   // 処理を厳格にする
module.exports = {
    NO_SPLITTABLE_FILES_FOUND:                  '分割可能なファイルが存在しません。',
    NOT_FOUND_SETTINGFILES:                     'settings.iniファイルが存在しません。',
    OUT_OF_TARGET_FILES:                        '分割できるファイルの拡張子は.csv、.txtです。',
    READ_FILE_SUCCESS:                          'ファイルの読み込みに成功しました。',
    READ_FILE_FAILURE:                          'ファイルの読み込みに失敗しました。',
    WRITE_FILE_SUCCESS: (filePath) =>           {return `${filePath} ファイルの書き込みに成功しました。`},
    WRITE_FILE_FAILURE: (filePath) =>           {return `${filePath} ファイルの書き込みに失敗しました。`},
    START_SPILIT_FILE:                          'ファイルの分割を開始しました。',
    FINISH_SPILIT_FILE:                         'ファイルの分割が完了しました。',
    LIMIT_FILE_COUNT: (fileCount, fileLimit) => {return `ファイルを${fileCount}に分割しようとしています。分割ファイル数の上限、${fileLimit} を超えました。settings.ini ファイルの lineLimit を変更してください。`},
    SPLIT_FILE_COUNT: (fileCount) =>            {return `${fileCount} ファイルに分割します。`},
    READ_FILE_COUNT_SUCCESS:                    '分割するファイル数の取得に成功しました。',
    MAKE_DIRECTORY_SUCCESS: (filePath) =>       {return `分割するファイルの格納先フォルダ ${filePath} の作成に成功しました。`},
    SPLITING_FILE: (fileNumber, fileCount) =>   {return `${fileNumber} / ${fileCount} ファイルの分割中...\n`},
}