import fs from 'node:fs/promises';
import path from 'node:path';
import { ENV_VARS,} from '../const/envVars.js';
import  env  from './env.js';
import {UPLOAD_DIR} from '../const/index.js'

export const saveFileToLocalMachine = async (file) => {
  const content = await fs.readFile(file.path);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);

  return env(ENV_VARS.BACKEND_HOST) + `/uploads/${file.filename}`;
};