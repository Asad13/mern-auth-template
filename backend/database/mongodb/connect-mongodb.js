import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (process.env.MONGO_URI !== undefined) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to mongodb database...');
    } else {
      throw new Error(
        'No mongodb uri variable is found in the environment as MONGO_URI'
      );
    }
  } catch (error) {
    console.log(error?.message);
    console.log(`[MONGODB CONNECTION ERROR]: shuting down...`);
    process.exit(1);
  }
};

export default connectMongoDB;
