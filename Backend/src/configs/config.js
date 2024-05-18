import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT ?? 8080,
  DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
  MONGO_URI:process.env.MONGO_URI,
  
 
};

export default config;