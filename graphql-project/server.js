import {
    graphql
}
from 'graphql';
import readline from 'readline';

import mySchema from './schema/main';

import {
    MongoClient
}
from 'mongodb';
import assert from 'assert';

const MONGO_URL = 'mongodb://localhost/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    const rli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rli.question('Client Request:', inputQuery => {
        graphql(mySchema, inputQuery, {}, { db }).then(result => {
            console.log('Server Answer :', result.data);
            db.close(() => rli.close());
        });
    });
});
