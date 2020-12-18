# BunkatsuKun
容量の大きい `.txt` や `.csv` を高速に分割してくれます！（私調べですが、600MBのファイルを5秒で分割してくれます）<br><br>
BunkatsuKun can split huge size `.txt` or `.csv` files as high speed!! (I measured. As a result, it could split about 600MB file at 5 seconds.)

# DEMO
まずは 分割したい行数を決めます。`settings.ini` 内の `lineLimit` を変更ください。<br><br>

First, determine the number of rows to be split by editing `lineLimit` on `settings.ini`.<br><br>

CLI（例:Windowsならcmd.exe）上で下記を実行。<br><br>
Please execute on CLI as follows.

```console
node index.js sample.txt
```

フォルダに分割されたファイルが生成されます。<br>
Split files are output as follows directory.

```console
Bunkatsu-sample.txt
    └─sample-1.txt
    └─sample-2.txt
    └─sample-3.txt
        .
        .
        .
```

# Requirement
since v12.10.0 nodejs<br>
since v4.2.4 graceful-fs<br>
since v2.1.1 properties-reader<br>
since v3.3.3 winston<br>
since v4.5.0 winston-daily-rotate-file

# Author
@autor:     KeitoDama<br>
@e-mail:    [keit0728.free@gmail.com](mailto:keit0728.free@gmail.com)

# License
"BunkatsuKun" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).