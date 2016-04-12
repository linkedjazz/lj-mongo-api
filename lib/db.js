//this module works with the datastore to do things~

var MongoClient = require('mongodb').MongoClient
var Db = require('mongodb').Db
var Server = require('mongodb').Server

var exports = module.exports = {}


exports.database = null
exports.collectionLookup = {}



exports.databaseConnect = function(cb){
	if (exports.database){
		if (cb) cb()
		return true
	}
	MongoClient.connect("mongodb://localhost:27017/lj", function(err, dbTripleStore) {
		if (err){
			console.log("Error connecting to database:",err)
		}else{
			console.log("[DB]:Connecting to database")
			exports.database = dbTripleStore
		}

		if (cb) cb()
	})
}




exports.returnCollection = function(collectionName,cb){
	exports.databaseConnect(function(){
		if (exports.collectionLookup[collectionName]){
			cb(null,exports.collectionLookup[collectionName])
		}else{
			var collection = exports.database.collection(collectionName)
			exports.collectionLookup[collectionName] = collection
			cb(null,exports.collectionLookup[collectionName])
		}
	})
}


