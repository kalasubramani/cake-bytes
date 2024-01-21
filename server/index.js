const {
  seed,
  client,
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json({limit: '10MB'}));
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

const init = async()=> {
  await client.connect();
  console.log('connected to database');
   if (process.env.SYNC === 'true') {
    console.log('create your tables and seed data');
    await seed();
   }
  
  const port = process.env.PORT || 3050;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
