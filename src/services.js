export const getSession = () => {
    return fetch('/api/v1/session', {
        method: 'GET',
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};

export const storeSession = (username) => {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username }),
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};

export const destroySession = () => {
    return fetch('/api/v1/session', {
        method: 'DELETE',
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};

export const getRecipes = () => {
    return fetch('/api/v1/recipes', {
        method: 'GET',
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};

export const getRecipeById = (id) => {
    return fetch(`/api/v1/recipe/${id}`, { 
        method: 'GET',
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};

export const storeRecipe = ({title, ingredients, instructions}) => {
    return fetch('/api/v1/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title : title, ingredients: ingredients , instructions: instructions }),
    })
    .catch(err => Promise.reject(err))
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then(err => Promise.reject(err));
    });
};
