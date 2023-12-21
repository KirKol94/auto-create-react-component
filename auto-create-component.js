import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryToWatch = path.join(__dirname, 'src', 'components');

const watcher = chokidar.watch(directoryToWatch);

const isDirectoryEmpty = async (dirPath) => {
   try {
      const files = await fs.readdir(dirPath);
      return files.length === 0;
   } catch (err) {
      console.error('Ошибка при чтении директории:', err);
      return false;
   }
};

watcher.on('addDir', async (newDir) => {
   const baseDir = path.basename(newDir);
   const isEmpty = await isDirectoryEmpty(newDir);

   if (isEmpty) {
      console.log(`Новая папка добавлена: ${baseDir}`);
      const cmd = `cd ${newDir} && createReactComponent`;
      exec(cmd, (error, stdout, stderr) => {
         if (error) {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            return;
         }
         if (stderr) {
            console.error(`Ошибка выполнения команды: ${stderr}`);
            return;
         }
         console.log(`Команда выполнена: ${stdout}`);
      });
   }
});

watcher.on('ready', () => {
   console.log(`Отслеживаем директорию: ${directoryToWatch}`);
});
