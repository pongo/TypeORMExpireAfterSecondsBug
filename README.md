# TypeORM expireAfterSeconds bug


TypeORM's `MongoSchemaBuilder.build()` calls `createCollectionIndex()` with all options (and default values), including option `expireAfterSeconds`. Because of this, MongoDB creates index with `{ expireAfterSeconds: null }` (thats incorrect value). After that Mongo's TTLMonitor every minute sends warning: "expireAfterSeconds field to be numeric but received a type of null".

`createCollectionIndex()` should delete `expireAfterSeconds` item from options if `expireAfterSeconds` is undefined or null.

## Reproduce

```console
$ git clone https://github.com/pongo/TypeORMExpireAfterSecondsBug.git
$ cd TypeORMExpireAfterSecondsBug
$ npm install
$ npm start
```

MongoDB log:

```
I INDEX    [conn42] build index on: expireAfterSecondsBug.user properties: { v: 2, unique: true, key: { login: 1 }, name: "IDX_a62473490b3e4578fd683235c5", ns: "expireAfterSecondsBug.user", sparse: false, background: false, expireAfterSeconds: null }

E INDEX    [TTLMonitor] ttl indexes require the expireAfterSeconds field to be numeric but received a type of null, skipping ttl job for: { v: 2, unique: true, key: { login: 1 }, name: "IDX_a62473490b3e4578fd683235c5", ns: "expireAfterSecondsBug.user", sparse: false, background: false, expireAfterSeconds: null }
```
