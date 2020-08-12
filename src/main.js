import { getSession, storeSession, destroySession, getRecipes, getRecipeById, storeRecipe} from './services';

(function () {
    const page = document.querySelector('.recipe-grid');
    const home = document.querySelector('.home');
    const lblStatus = document.querySelector('.status');
    const olRecipes = document.querySelector('.home .recipes');
    const txtUsername = document.querySelector('.user-name');
    const btnLogin = document.querySelector('.auth .btn-login');
    const btnLogout = document.querySelector('.auth .btn-logout');
    const addRecipe = document.querySelector('.add-recipe');
    const recipeDetails = document.querySelector('.recipe-details');
    const recipeHome = document.querySelector('.recipe-home');
    const recipeAdd = document.querySelector('.recipe-add');
   
    page.addEventListener('click', (event) => {
        if(event.target.classList.contains('btn-login')) {
            const username = txtUsername.value;
            storeSession(username)
            .then(() => {
                txtUsername.value = '';
                renderStatus();
                renderAuth(false);
            })
            .catch(err => {
                renderStatus(err);
            });
        }

        if(event.target.classList.contains('btn-logout')) {
            destroySession()
            .then(() => {
                renderStatus();
                renderAuth(true);
                renderHome(true);
                renderDetails();
                renderAdd(false);
            })
            .catch(err => {
                renderStatus(err);
            });
        }

        if(event.target.classList.contains('btn-add-recipe')) {
            renderStatus();
            renderHome(false);
            renderDetails();
            renderAdd(true);
            clearForm();
        }

        if(event.target.classList.contains('btn-home')) {
            renderStatus();
            renderHome(true);
            renderDetails();
            renderAdd(false);
        }

        if(event.target.classList.contains('link-recipe')) {
            event.preventDefault();
            const id = event.target.dataset.id;
            renderHome(false);
            renderDetails(id);
        }

        if(event.target.classList.contains('btn-submit')) {
            event.preventDefault();
            const title = document.querySelector('.title').value;
            const ingredients = document.querySelector('.ingredients').value;
            const instructions = document.querySelector('.instructions').value;

            storeRecipe({title, ingredients, instructions})
            .then((recipeId) => { 
                renderStatus();
                renderAdd(false);
                renderDetails(recipeId);
            })
            .catch((err) => { 
                renderStatus(err);
            });
        }
    });

    const renderHome = (show) => {
        show ? home.classList.remove('hidden') : home.classList.add('hidden');
        getRecipes()
        .then((recipes) => { 
            olRecipes.innerHTML = '';
            for (const key in recipes) {
                const recipe = recipes[key];
                olRecipes.innerHTML += `
                    <li class="item-group-child">
                        <div class="item-grid">
                            <a class="link-recipe" href="#" data-id="${recipe.id}">${recipe.title}</a>
                            <p>${recipe.author}</p>
                        </div>
                    </li>
                `;
            }
        })
        .catch((err) => { 
            renderStatus(err);
        });
    };

    const renderDetails = (id) => {
        if(id) {
            recipeHome.classList.remove('hidden');
            recipeDetails.classList.remove('hidden');
            getRecipeById(id)
            .then((recipe) => { 
                recipeDetails.innerHTML = `
                    <div>
                        <h2>Title</h2>
                        <h4>${recipe.title}</h4>
                        <h2>Author</h2>
                        <h4>${recipe.author}</h4>
                        <h2>Ingredients</h2>
                        <h4>${recipe.ingredients}</h4>
                        <h2>Instructions</h2>
                        <h4>${recipe.instructions}</h4>
                    </div>
                `;
            })
            .catch((err) => { 
                renderStatus(err);
            });
        } 
        else {
            recipeHome.classList.add('hidden');
            recipeDetails.classList.add('hidden');
        }
    };

    const renderAdd = (show) => {
        if(show) {
            recipeHome.classList.remove('hidden');
            recipeAdd.classList.remove('hidden');
        }
        else {
            recipeHome.classList.add('hidden');
            recipeAdd.classList.add('hidden');
        }
    };

    const renderAuth = (show) => {
        btnLogin.disabled = !show;
        txtUsername.disabled = !show;
        btnLogout.disabled = show;
        show ? addRecipe.classList.add('hidden') : addRecipe.classList.remove('hidden');
    };

    const renderStatus = (msg) => {
        lblStatus.innerText = msg;
        msg ? lblStatus.classList.remove('hidden') : lblStatus.classList.add('hidden');
    };

    const clearForm = () => {
        document.querySelector('.title').value = '';
        document.querySelector('.ingredients').value = '';
        document.querySelector('.instructions').value = '';
    };

    const runDefaults = () => {
        renderDetails();
        renderAdd(false);
        renderHome(true);
        renderStatus();

        getSession()
        .then(() => { 
            renderAuth(false);
        })
        .catch(() => {
            renderAuth(true);
        });
    };

    runDefaults();

})();
