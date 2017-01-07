import assert from 'assert';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import fs from 'fs';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import path from 'path';
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
    
    app.use(express.static(`${__dirname}/public`));
    
    const port = process.env.PORT || 3000;
    
    graphql(mySchema, introspectionQuery)
    .then(result => {
        fs.writeFileSync(
            path.join(__dirname, 'cache/schema.json'), 
            JSON.stringify(result, null, 2)
        );
        console.info('Generated cached schema.json file');
    })
    .catch(console.error);
    
    app.listen(port, () => console.info(`Server running on ${port}...`));
});