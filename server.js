const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = require('./app');
const { DB_URL } = require('./constants/config');

const PORT = process.env.PORT || 8000;

mongoose
  .connect(DB_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => {
    {
      console.log('====DB(ERROR)====');
      console.log(err);
    }
  });

app.listen(PORT, (err) => {
  if (err) return console.log(err);

  console.log(`server started. listening to port:${PORT}`);
});
