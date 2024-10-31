import fs from "fs";
import path from "path";

// 遍历目录并重命名文件
function traverseAndRename(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`无法读取目录: ${err}`);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`无法获取文件信息: ${err}`);
          return;
        }
        if (stats.isDirectory()) {
          // 如果是目录，递归调用
          traverseAndRename(filePath);
        } else {
          // 如果文件名包含 'ca'，进行重命名
          if (file.includes("ca")) {
            const newFileName = file.replace("ca", "ba");
            const newFilePath = path.join(dirPath, newFileName);
            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.error(`重命名文件失败: ${err}`);
              } else {
                console.log(`文件重命名成功: ${file} -> ${newFileName}`);
              }
            });
          }
        }
      });
    });
  });
}

// 开始遍历当前目录并重命名
traverseAndRename(__dirname);
