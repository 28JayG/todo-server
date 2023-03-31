const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err) return console.log(err);

  console.log(`server started. listening to port:${PORT}`);
});
