import mongoose from 'mongoose';
import env from '../utils/env.js';
import { ENV_VARS } from '../const/envVars.js';

export default async function initMongoConnection() {
  try {
    const user = env(ENV_VARS.MONGODB_USER);
    const password = env(ENV_VARS.MONGODB_PASSWORD);
    const url = env(ENV_VARS.MONGODB_URL);
    const db = env(ENV_VARS.MONGODB_DB);

    const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
}