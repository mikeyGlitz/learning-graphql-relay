import assert from 'assert';

import express from 'express';
import graphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';
const MONGO_URL = "mongodb://localhost/test";

import {mySchema} from './schema/main.js';

const app = express();
MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(err, null);
    console.log('Connected to MongoDB server');
    
    app.use('/graphql', graphQLHTTP({
        schema: mySchema,
        context: {db},
        graphiql: true
    }));
    
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => console.log(`Server running on ${port}...`));
});