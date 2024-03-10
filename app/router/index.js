// IMPORT DU MODULE ROUTER
const router = require("express").Router();

// MIDDLEWARE AUTHENTIFICATION JWT
const jwt = require("../middlewares/jwt");

// MIDDLEWARE MULTER POUR LE TELECHARGEMENT D'IMAGES
const multer = require("../middlewares/multer");

// LES CONTROLEURS
const mainController = require("../controllers/mainController.js");
const recipeController = require("../controllers/recipeController.js");
const authController = require("../controllers/authController.js");

// *MAINCONTROLLER
router.get("/", mainController.homePage);

// *RECIPECONTROLLER
router.get("/recipes", recipeController.showAllRecipes);
router.get("/recipes/:id", recipeController.showOneRecipe);
router.get("/recipesLast", recipeController.showLastRecipes);
router.post("/addRecipe", jwt, multer, recipeController.addRecipePost);
router.delete("/recipes/delete/:id", jwt, recipeController.deleteOneRecipe);
router.patch("/recipes/update/:id",
  jwt,
  multer,
  recipeController.updateOneRecipe
);
router.get(
  "/recipes/category/:category",
  recipeController.showRecipesByCategory
);
router.get("/recipes/user/:userId", jwt, recipeController.showRecipesByUser);

router.post("/recipes/comment/:id", jwt, recipeController.addCommentPost);
router.get("/recipes/:id/comments", recipeController.showCommentsByRecipe);

router.post("/recipes/like/:id", jwt, recipeController.addLikePost);
router.get("/recipes/:id/likes", recipeController.showLikesByRecipe);

router.post("/recipes/title/:title", recipeController.searchRecipesByTitle);
router.get("/recipes/title/:title", recipeController.showRecipesByFilter);

// *AUTHCONTROLLER
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);

router.get("/user/:userId", jwt, authController.showOneUser);
router.patch("/user/update/:userId", jwt, authController.updateOneUser);
router.patch(
  "/user/updatePassword/:userId",
  jwt,
  authController.updatePassword
);
router.delete("/user/delete/:userId", jwt, authController.deleteOneUser);

module.exports = router;
