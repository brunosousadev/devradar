const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://OmniStack10:OmniStack10@cluster0-b6cww.mongodb.net/listDevs?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
