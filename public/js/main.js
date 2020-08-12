/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");


(function () {
  var page = document.querySelector('.recipe-grid');
  var home = document.querySelector('.home');
  var lblStatus = document.querySelector('.status');
  var olRecipes = document.querySelector('.home .recipes');
  var txtUsername = document.querySelector('.user-name');
  var btnLogin = document.querySelector('.auth .btn-login');
  var btnLogout = document.querySelector('.auth .btn-logout');
  var addRecipe = document.querySelector('.add-recipe');
  var recipeDetails = document.querySelector('.recipe-details');
  var recipeHome = document.querySelector('.recipe-home');
  var recipeAdd = document.querySelector('.recipe-add');
  page.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-login')) {
      var username = txtUsername.value;
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["storeSession"])(username).then(function () {
        txtUsername.value = '';
        renderStatus();
        renderAuth(false);
      })["catch"](function (err) {
        renderStatus(err);
      });
    }

    if (event.target.classList.contains('btn-logout')) {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["destroySession"])().then(function () {
        renderStatus();
        renderAuth(true);
        renderHome(true);
        renderDetails();
        renderAdd(false);
      })["catch"](function (err) {
        renderStatus(err);
      });
    }

    if (event.target.classList.contains('btn-add-recipe')) {
      renderStatus();
      renderHome(false);
      renderDetails();
      renderAdd(true);
      clearForm();
    }

    if (event.target.classList.contains('btn-home')) {
      renderStatus();
      renderHome(true);
      renderDetails();
      renderAdd(false);
    }

    if (event.target.classList.contains('link-recipe')) {
      event.preventDefault();
      var id = event.target.dataset.id;
      renderHome(false);
      renderDetails(id);
    }

    if (event.target.classList.contains('btn-submit')) {
      event.preventDefault();
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      var instructions = document.querySelector('.instructions').value;
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["storeRecipe"])({
        title: title,
        ingredients: ingredients,
        instructions: instructions
      }).then(function (recipeId) {
        renderStatus();
        renderAdd(false);
        renderDetails(recipeId);
      })["catch"](function (err) {
        renderStatus(err);
      });
    }
  });

  var renderHome = function renderHome(show) {
    show ? home.classList.remove('hidden') : home.classList.add('hidden');
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["getRecipes"])().then(function (recipes) {
      olRecipes.innerHTML = '';

      for (var key in recipes) {
        var recipe = recipes[key];
        olRecipes.innerHTML += "\n                    <li class=\"item-group-child\">\n                        <div class=\"item-grid\">\n                            <a class=\"link-recipe\" href=\"#\" data-id=\"".concat(recipe.id, "\">").concat(recipe.title, "</a>\n                            <p>").concat(recipe.author, "</p>\n                        </div>\n                    </li>\n                ");
      }
    })["catch"](function (err) {
      renderStatus(err);
    });
  };

  var renderDetails = function renderDetails(id) {
    if (id) {
      recipeHome.classList.remove('hidden');
      recipeDetails.classList.remove('hidden');
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["getRecipeById"])(id).then(function (recipe) {
        recipeDetails.innerHTML = "\n                    <div>\n                        <h2>Title</h2>\n                        <h4>".concat(recipe.title, "</h4>\n                        <h2>Author</h2>\n                        <h4>").concat(recipe.author, "</h4>\n                        <h2>Ingredients</h2>\n                        <h4>").concat(recipe.ingredients, "</h4>\n                        <h2>Instructions</h2>\n                        <h4>").concat(recipe.instructions, "</h4>\n                    </div>\n                ");
      })["catch"](function (err) {
        renderStatus(err);
      });
    } else {
      recipeHome.classList.add('hidden');
      recipeDetails.classList.add('hidden');
    }
  };

  var renderAdd = function renderAdd(show) {
    if (show) {
      recipeHome.classList.remove('hidden');
      recipeAdd.classList.remove('hidden');
    } else {
      recipeHome.classList.add('hidden');
      recipeAdd.classList.add('hidden');
    }
  };

  var renderAuth = function renderAuth(show) {
    btnLogin.disabled = !show;
    txtUsername.disabled = !show;
    btnLogout.disabled = show;
    show ? addRecipe.classList.add('hidden') : addRecipe.classList.remove('hidden');
  };

  var renderStatus = function renderStatus(msg) {
    lblStatus.innerText = msg;
    msg ? lblStatus.classList.remove('hidden') : lblStatus.classList.add('hidden');
  };

  var clearForm = function clearForm() {
    document.querySelector('.title').value = '';
    document.querySelector('.ingredients').value = '';
    document.querySelector('.instructions').value = '';
  };

  var runDefaults = function runDefaults() {
    renderDetails();
    renderAdd(false);
    renderHome(true);
    renderStatus();
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["getSession"])().then(function () {
      renderAuth(false);
    })["catch"](function () {
      renderAuth(true);
    });
  };

  runDefaults();
})();

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: getSession, storeSession, destroySession, getRecipes, getRecipeById, storeRecipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSession", function() { return getSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeSession", function() { return storeSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroySession", function() { return destroySession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecipes", function() { return getRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecipeById", function() { return getRecipeById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeRecipe", function() { return storeRecipe; });
var getSession = function getSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var storeSession = function storeSession(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username
    })
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var destroySession = function destroySession() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getRecipes = function getRecipes() {
  return fetch('/api/v1/recipes', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getRecipeById = function getRecipeById(id) {
  return fetch("/api/v1/recipe/".concat(id), {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var storeRecipe = function storeRecipe(_ref) {
  var title = _ref.title,
      ingredients = _ref.ingredients,
      instructions = _ref.instructions;
  return fetch('/api/v1/recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instructions: instructions
    })
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map