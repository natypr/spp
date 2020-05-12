const express = require('express');
const db = require('./app/config/db');
const graphqlHTTP = require('express-graphql');
const resolver = require('./app/resolver/resolver');
const schema = require('./app/model/schema');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./app/route/routes');
const authenticate = require('./app/auth/authenticate');
const bodyParser = require('body-parser-graphql');
const cors = require("cors");
const app = express();
const {graphqlUploadExpress} = require('graphql-upload');
const path = require('path');

app.use(bodyParser.graphql());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.use(passport.initialize());
app.use(cors());
app.use('/graphql',
    authenticate.verifyUser,
    graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 1}),
    graphqlHTTP({schema, rootValue: resolver})
);

const PORT = process.env.PORT || 8090;

mongoose.connect(process.env.MONGODB_URI || db.url, {
    'useCreateIndex': true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    err ? console.log(err.message) : console.log('MongoDB Successfully Connected ...');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});