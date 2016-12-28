import {
    graphql
}
from 'graphql';
// import readline from 'readline';

import mySchema from './schema/main';

import express from 'express';
import graphqlHTTP from 'express-graphql';

const app = express();

import {
    MongoClient
}
from 'mongodb';
import assert from 'assert';

const MONGO_URL = 'mongodb://localhost/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: {
            db
        }
    }));

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.info(`Running server on ${port}...`);
    })

    // const rli = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rli.question('Client Request:', inputQuery => {
    //     graphql(mySchema, inputQuery, {}, { db }).then(result => {
    //         console.log('Server Answer :', result.data);
    //         db.close(() => rli.close());
    //     });
    // });
});
