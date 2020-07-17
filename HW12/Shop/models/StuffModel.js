const mongoose = require('mongoose');
let stuffSchema = mongoose.Schema({name: String, order: [[String]]});
// Singular name of collection, pluralized in DB
let collectionName = 'orders';
let StuffModel = mongoose.model(collectionName,
                                stuffSchema);
module.exports = StuffModel;
