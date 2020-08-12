const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const sample = require('./sample');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/api/v1/session', (req,res) => {
    const uid = req.cookies.uid;
    if(!uid) {
        return res.status(401).json("Unauthorized. No session found. Please login again to continue.");
    }
    if(uid && !sample.users[uid]) {
		res.clearCookie('uid');
        return res.status(403).json("Session expired. Please login again to continue.");
    }
	return res.json("Session exists.");
});

app.post('/api/v1/session', express.json(), (req,res) => {
    const name = req.body.name;
    if(!name) {
		return res.status(400).json("Name is required to login.");
    }
    if(name.toLowerCase().includes("dog")) {
		return res.status(400).json("Name should not contain 'dog' to login.");
    }
    if(name.indexOf(' ') >= 0) {
        return res.status(400).json("Name should not contain whitespace to login.");
    }
    const uid = uuid.v4();
    sample.users[uid] = name;
    res.cookie('uid', uid);
	return res.json("New session created.");
});

app.delete('/api/v1/session', (req, res) => {
    uid = req.cookies.uid;
    res.clearCookie('uid');
    delete sample.users[uid];
    return res.json("Session deleted.");
});

app.get('/api/v1/recipes', (req, res) => {
    return res.json(Object.values(sample.recipes));
});

app.get(`/api/v1/recipe/:id`, (req,res) => {
    const recipeId = req.params.id;
    if(!sample.recipes[recipeId]) {
        return res.status(400).json("No recipe found.");
    }
    return res.json(sample.recipes[recipeId]); 
});

app.post('/api/v1/recipe', express.json(), (req,res) => {
    const uid = req.cookies.uid;
    if(!uid) {
        return res.status(401).json('Unauthorized. No session found. Please login again to continue.');
    }
    if(uid && !sample.users[uid]) {
        return res.status(403).json('Session expired. Please login again to continue.');
    }
    const author = sample.users[uid];
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    if(!title || !ingredients || !instructions) {
        return res.status(400).json('Recipe title, ingredients and instructions are required.');
    }
    const recipeId = nextId();
    sample.recipes[recipeId] = {
        id: recipeId, 
        title: title, 
        author: author, 
        ingredients: ingredients,
        instructions: instructions
    };
    return res.json(recipeId);
});

const counter = () =>  {
    let count = 2;
    return () => {
      count += 1;
      return count;
    };
};

const nextId = counter();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});