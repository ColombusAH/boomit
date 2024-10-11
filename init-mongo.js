const database = 'boomit';
const collection = 'test';
use(database);
console.log('---------');
console.log(db.getUsers())
const rickExists = db.getUsers().users.some(user => user.user === 'rick');

if (!rickExists) {
  db.createUser({
    user: 'rick',
    pwd: 'ricksanchez',
    roles: [{ role: 'readWrite', db: database }]
  });
  print('User rick created.');
} else {
  print('User rick already exists.');
}

// Create a new database.

// Create a new collection.
db.createCollection(collection);



// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
