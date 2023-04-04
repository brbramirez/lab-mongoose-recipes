const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe';

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
    return Recipe.create({
      title: "Spaghetti with Tomato Sauce",
      level: 'Easy Peasy',
      ingredients: [
        "8 oz. spaghetti pasta",
        "1 (14 oz.) can of diced tomatoes",
        "1/4 cup olive oil",
        "2 cloves garlic, minced",
        "1/4 teaspoon red pepper flakes",
        "Salt and pepper to taste",
        "Fresh basil for garnish",
      ],
      cuisine: "Italian",
      dishType: "main",
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 10,
      creator: "Someone italian",
    });
  })
  .then((recipe) => {
    console.log(`The Recipe: ${recipe.title}`)
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((data, index) => {
      console.log(`${index}.- ${data.title}`);
    });
    return Recipe.findOneAndUpdate(
      {title:'Rigatoni alla Genovese'},
      {duration: 100}
    );
  })
  .then(() => {
    console.log('Update succeded!');
    Recipe.deleteOne({title:'Carrot Cake'});
  })
  .then(() => console.log("Carrot Cake succesfully deleted"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    console.log(`Disconnected`);
    mongoose.disconnect();
  })
