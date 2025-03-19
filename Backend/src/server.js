import { createServer } from 'http';
const port = process.env.PORT || 3000;
import app from './app.js';
import { connectToDb } from './db/index.js'

const server = createServer(app);

server.listen(port, async()=>{
    await connectToDb();
    console.log(`server is running on port ${port}`);
});