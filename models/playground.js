/**
 * Created by arobichaud on 7/20/2016.
 */
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var PlaygroundSchema = new Schema({
    name: String,
    description: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model( 'Playground', PlaygroundSchema );