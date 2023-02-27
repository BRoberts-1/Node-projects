// Initialize database once downloaded: sudo systemctl start mongodb

// To check if it initialized: sudo systemctl status mongodb

// To have mongodb restart whenever machine boots up: sudo systemctl enable mongodb

// To get version: mongod --version

// To uninstall mongodb: sudo pacman -Rns mongodb-bin

// After downloading mongo shell, to start have mongodb running in background, then: mongosh

// Once inside mongodb shell, can see all databases: show dbs

// To choose/switch to OR create a new database: use [name of database]

/////////// CREATING DOCUMENTS /////////////////

// Once database chosen OR created, to create a collection with a document: dbs.[collection name].insertOne({fieldname: value, fieldname: "value", fieldname: value})

// Or another method to write more than one document, it accepts an array of objects: dbs.[collectioname].insertMany([{fieldname: value}, {fieldname: value, fieldname: value}])

// To see what documents are on a collection: db.[collectionname].find()

/////////// QUERYING(READING) DOCUMENTS /////////////////

// To query all documents in collection db.[collectionname].find()

// To use filters, use an object with filter criteria as an arg: db.tours.find({"name": "The Forest Hiker"}) Another example: db.tours.find({"difficulty" : "easy"})

// To use more complex filter: eg to find price less than 500, we will use another object mongodb operator sign $ plus lte which stand for less than or equal to(ie <=): db.tours.find({ price: {$lte: 500} })

// To query with more than one criteria/parameters eg. to search for price <= 500 AND rating > 4.8:
