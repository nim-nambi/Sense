//connection to mongo db database

const mongoose = require('mongoose');

//after 27017/ is database name
mongoose.connect('mongodb://localhost:27017/meandb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err) => {
    if (!err) {
      console.log('Connection Successful to database')
    } else {
      console.log('Error in connection to database' + err)
    }
  })


module.exports = mongoose;