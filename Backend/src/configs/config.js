import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  LOCAL_PORT: process.env.LOCAL_PORT || 8080,
  PRODUCTION_URL: process.env.PRODUCTION_URL,
  DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
