import initMongoConnection from './db/initMongoConnection.js';
import {setupServer} from './server.js';
import {createFolderIfDoesNotExist} from '../src/utils/createFolderIfDoesNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './const/index.js';

await initMongoConnection();
createFolderIfDoesNotExist(TEMP_UPLOAD_DIR);
createFolderIfDoesNotExist(UPLOAD_DIR);
setupServer();