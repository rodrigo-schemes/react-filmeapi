import mongoose from 'mongoose';
import { logger } from '../../../shared/logger/logger';

const connectToDatabase = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri){
    logger.error('❌ MONGO_URI não definida no .env');
    throw new Error('MONGO_URI não definida no .env');
  }

  await mongoose.connect(uri);
  logger.info('✅ MongoDB conectado');
};

export default connectToDatabase;