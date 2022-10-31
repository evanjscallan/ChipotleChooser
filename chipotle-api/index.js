const Express = require('express')
const BodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require("mongodb").ObjectID;
const DATABASE_NAME = 'ChipotleChooser'
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const userPass = process.env.password

const endpointURL = "https://data.mongodb-api.com/app/6353083f26c59123c9c444d5/endpoint"

const CONNECTION_URL = `mongodb+srv://evanjscallan:${userPass}@chipotlechooser.pyf5pzv.mongodb.net/?retryWrites=true&w=majority`;


const app = Express()

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(6000, () => {
	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
		if (error){
			throw error;
		}
		database = client.db(DATABASE_NAME)
		collection = database.collection("nutritionData")
		console.log("Connected to `" + DATABASE_NAME + "`!");
	});
});


app.get("/nutritionData", (request, response) => {
	collection.find({ 'Menu Type': 'Adult' }).toArray((error, result) => {
		if (error) {
			return response.status(500).send(error);
		}
		response.send(result)
	});
});


