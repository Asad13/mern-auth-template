import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import connectMongoDB from './database/mongodb/connect-mongodb.js';
import createApp from './app.js';

const init = async () => {
  await connectMongoDB();
};

init()
  .then(() => {
    const app = createApp();
    const server = createServer(app);
    const PORT = process.env.PORT ?? 5000;
    // '127.0.0.1',
    server.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
      console.log(`process id: ${process.pid}`);

      if (
        (process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'staging') &&
        process.send != null
      ) {
        process.send('ready'); // Sending the ready signal to PM2
      }
    });

    server.on('error', (error) => {
      console.error(`server error: ${error?.message}`);
    });
  })
  .catch(() => {
    console.error(`[RESOURCE CONNECTION ERROR]: shuting down...`);
    process.exit(1);
  });
