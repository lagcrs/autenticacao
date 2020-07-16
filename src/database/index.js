const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-fwrdb.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

module.exports = mongoose;