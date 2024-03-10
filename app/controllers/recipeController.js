const dataMapper = require("../database/datamapper");

const recipeController = {
  // Toutes les recettes
  showAllRecipes: async (req, res) => {
    try {
      const recipes = await dataMapper.getAllRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Une recette
  showOneRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      const detailsRecipe = await dataMapper.getOneRecipe(id);
      if (!detailsRecipe) {
        res.status(404).json({ error: "Recette non trouvée" });
        return;
      }
      res.status(200).json(detailsRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Rcettes par catégorie
  showRecipesByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const recipes = await dataMapper.getRecipesByCategory(category);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // 3 dernières recettes 
  showLastRecipes: async (req, res) => {
    try {
      const lastRecipes = await dataMapper.threeLastRecipes();
      res.status(200).json(lastRecipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Ajouter une recette
  addRecipePost: async (req, res) => {
    try {
      const recipeData = {
        title: req.body.title,
        // Image par défaut sinon (TypeError: Cannot read properties of undefined (reading 'path')) quand l'utilisateur ne télécharge pas d'image. Les images ne sont pas obligatoires.
        image: req.file
          ? req.file.path
          : "images/imgQuizineDefaut.png1709082437161.png",
        category: req.body.category,
        time_cook_hours: req.body.time_cook_hours,
        time_cook_minutes: req.body.time_cook_minutes,
        difficulty: req.body.difficulty,
        nb_persons: req.body.nb_persons,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        id_member: req.user.userId,
      };
      await dataMapper.addRecipe(recipeData);
      res
        .status(201)
        .json({ message: "Recette ajoutée avec succès", recipeData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Supprime une recette
  deleteOneRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      await dataMapper.deleteRecipe(id);
      res.status(200).json({ message: "Recette supprimée avec succès" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de la suppression de la recette" });
    }
  },

  // Mise à jour d'une recette
  updateOneRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = {
        title: req.body.title,
        // Image par défaut sinon (TypeError: Cannot read properties of undefined (reading 'path')) quand l'utilisateur ne télécharge pas d'image. Les images ne sont pas obligatoires.
        image: req.file
          ? req.file.path
          : "images/imgQuizineDefaut.png1709082437161.png",
        category: req.body.category,
        time_cook_hours: req.body.time_cook_hours,
        time_cook_minutes: req.body.time_cook_minutes,
        difficulty: req.body.difficulty,
        nb_persons: req.body.nb_persons,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        id_member: req.user.userId,
      };

      await dataMapper.updateRecipe(id, updateData);
      res.status(200).json({ message: "Recette mise à jour avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Recettes par membre
  showRecipesByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const recipes = await dataMapper.getRecipesByUser(userId);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Ajoute un commentaire
  addCommentPost: async (req, res) => {
    try {
      const data = {
        content: req.body.content,
        id_member: req.user.userId,
        id_recipe: req.params.id,
      };
      await dataMapper.addComment(data);
      res.status(201).json({ message: "Commentaire ajouté avec succès", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Commentaires par recette
  showCommentsByRecipe: async (req, res) => {
    try {
      const id_recipe = req.params.id;
      const comments = await dataMapper.getCommentsByRecipe(id_recipe);
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Ajout "J'aime"
  addLikePost: async (req, res) => {
    try {
      const data = {
        id_member: req.user.userId,
        id_recipe: req.params.id,
      };
      console.log(data);
      await dataMapper.addLike(data);
      res.status(201).json({ message: "Like ajouté avec succès", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Nombre de "J'aime"
  showLikesByRecipe: async (req, res) => {
    try {
      const id_recipe = req.params.id;
      const likes = await dataMapper.getLikesByRecipe(id_recipe);
      res.status(200).json(likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Recherche recette par son titre 
  searchRecipesByTitle: async (req, res) => {
    try {
      const title = req.params.title;
      const recipes = await dataMapper.searchTitleRecipes(title);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Résultats recettes filtrées par son titre
  showRecipesByFilter: async (req, res) => {
    try {
      const title = req.params.title;
      const recipes = await dataMapper.getRecipesByFilter(title);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = recipeController;
