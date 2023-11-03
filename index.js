const mongoose = require('mongoose');
const express = require("express");
const path = require("path")




// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { title } = require('process');

const MONGODB_URI = 'mongodb+srv://rafaelgerotto28:Gerotto181820%40@cluster0.ocxavdt.mongodb.net/recipe-app';

const carbonara = {
  title: "Pasta Carbonara",
  level: "Easy Peasy",
  ingredients: ["Pasta", "Bacon", "egg", "cheese"],
  cuisine: "Mediterrania",
  dishType: "main_course",
  image: "",
  duration: 30,
  creator: "Rafael",
  created: "",
};
const dataJson = require("./data.json");

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(carbonara)
    })
    .then(() => {
      console.log(carbonara.title)
      return Recipe.insertMany(dataJson);
    })
    .then((title) => {
      dataJson.forEach((title) => {
        console.log(title.title);
      })
    })
    .then((findOneAndupdate) => {
      Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese"},
        {duration: 100}
        )
        .then((updateRecipe) => {
        //console.log(updateRecipe)
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .then((removeOne) => {
      Recipe.deleteOne(
        {title: "Carrot Cake"},
      )
      .then((removeIt) => {
        console.log(removeIt)
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .then(() => {

      mongoose.connection.close()
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });