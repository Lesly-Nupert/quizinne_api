// *LE DATAMAPPER INTERROGE LA BASE DE DONNÉES
const client = require("./client");

// *REQUÊTES PRÉPARÉES AVEC DES PLACEHOLDERS $ (PROTÈGE DES INJECTIONS SQL)

// Récupère toutes les recettes
const dataMapper = {
  async getAllRecipes() {
    const query = "SELECT * FROM recipe ORDER BY id_recipe DESC";
    const result = await client.query(query);
    return result.rows;
  },

  // Récupère les détails d'une recette + le pseudo de son créateur
  async getOneRecipe(id) {
    const query = {
      text: "SELECT recipe.*, member.* FROM recipe JOIN member ON recipe.id_member = member.id_member  WHERE recipe.id_recipe = $1",
      values: [id],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  // Récupère les recettes par catégorie
  async getRecipesByCategory(category) {
    const query = {
      text: "SELECT * FROM recipe WHERE category = $1 ORDER BY id_recipe DESC",
      values: [category],
    };
    const result = await client.query(query);
    return result.rows;
  },

  // Recupère les 3 dernières recettes pour la page d'accueil du site
  async threeLastRecipes() {
    const query = "SELECT * FROM recipe ORDER BY id_recipe DESC LIMIT 3";
    const result = await client.query(query);
    return result.rows;
  },

  // Création du membre
  async createUser(data) {
    const { pseudo, email, password } = data;
    const query = {
      text: "INSERT INTO member (pseudo, email, password) VALUES ($1, $2, $3)",
      values: [pseudo, email, password],
    };
    await client.query(query);
  },

  // Membre par son mail
  async getUserByEmail(email) {
    const query = {
      text: "SELECT * FROM member WHERE email = $1",
      values: [email],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  // Ajoute une recette
  async addRecipe(data) {
    const {
      title,
      image,
      category,
      time_cook_hours,
      time_cook_minutes,
      difficulty,
      nb_persons,
      ingredients,
      steps,
      id_member,
    } = data;
    const query = {
      text: "INSERT INTO recipe (title, image, category, time_cook_hours, time_cook_minutes, difficulty, nb_persons, ingredients, steps, id_member) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      values: [
        title,
        image,
        category,
        time_cook_hours,
        time_cook_minutes,
        difficulty,
        nb_persons,
        ingredients,
        steps,
        id_member,
      ],
    };
    await client.query(query);
  },

  // Supprime une recette
  async deleteRecipe(id) {
    const query = {
      text: "DELETE FROM recipe WHERE id_recipe = $1",
      values: [id],
    };
    await client.query(query);
  },

  // Met à jour une recette
  async updateRecipe(id, updateData) {
    const {
      title,
      image,
      category,
      time_cook_hours,
      time_cook_minutes,
      difficulty,
      nb_persons,
      ingredients,
      steps,
    } = updateData;
    const query = {
      text: `UPDATE recipe SET title = $1, image = $2, category = $3, time_cook_hours= $4, time_cook_minutes= $5, difficulty = $6, nb_persons = $7, ingredients = $8, steps = $9 WHERE id_recipe = $10`,
      values: [
        title,
        image,
        category,
        time_cook_hours,
        time_cook_minutes,
        difficulty,
        nb_persons,
        ingredients,
        steps,
        id,
      ],
    };
    await client.query(query);
  },

  // Récupère toutes les recettes d'un membre
  async getRecipesByUser(userId) {
    const query = {
      text: "SELECT * FROM recipe WHERE id_member = $1 ORDER BY id_recipe DESC",
      values: [userId],
    };
    const result = await client.query(query);
    return result.rows;
  },

  // Ajoute un commentaire
  async addComment(data) {
    const { content, id_member, id_recipe } = data;
    const query = {
      text: "INSERT INTO comment (content, id_member, id_recipe) VALUES ($1, $2, $3)",
      values: [content, id_member, id_recipe],
    };
    await client.query(query);
  },

  // Récupère les commentaires par recette
  async getCommentsByRecipe(id_recipe) {
    const query = {
      text: "SELECT comment.*, member.* FROM comment JOIN member ON comment.id_member = member.id_member WHERE id_recipe = $1",
      values: [id_recipe],
    };
    const result = await client.query(query);
    return result.rows;
  },

  // Ajoute un "J'aime"
  async addLike(data) {
    const { id_member, id_recipe } = data;
    const query = {
      text: 'INSERT INTO "like" (id_member, id_recipe) VALUES ($1, $2)',
      values: [id_member, id_recipe],
    };
    await client.query(query);
  },

  // Compte le nombre de "J'aime" par recette
  async getLikesByRecipe(id_recipe) {
    const query = {
      text: 'SELECT COUNT (id_recipe) FROM "like" WHERE id_recipe = $1',
      values: [id_recipe],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  // Recherche filtrée au niveau du titre, insensible à la casse
  async searchTitleRecipes(title) {
    const query = {
      text: "SELECT * FROM recipe WHERE title ILIKE $1",
      values: [`%${title}%`],
    };
    const result = await client.query(query);
    return result.rows;
  },

  // Résultat filtré au niveau du titre, insensible à la casse
  async getRecipesByFilter(title) {
    const query = {
      text: "SELECT * FROM recipe WHERE title ILIKE $1",
      values: [`%${title}%`],
    };
    const result = await client.query(query);
    return result.rows;
  },

  // Récupère un membre
  async getOneUser(userId) {
    const query = {
      text: "SELECT * FROM member WHERE id_member = $1",
      values: [userId],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  // Met à jour le pseudo et/ou le mail
  async updateUser(userId, updateData) {
    const { pseudo, email } = updateData;
    const query = {
      text: `UPDATE member SET pseudo = $1, email = $2 WHERE id_member = $3`,
      values: [pseudo, email, userId],
    };
    await client.query(query);
  },

  // Met à jour le mot de passe
  async changePassword(userId, hashedPassword) {
    const query = {
      text: `UPDATE member SET password = $1 WHERE id_member = $2`,
      values: [hashedPassword, userId],
    };
    await client.query(query);
  },

  // Supprime le compte utilisateur
  async deleteUser(userId) {
    const query = {
      text: "DELETE FROM member WHERE id_member = $1",
      values: [userId],
    };
    await client.query(query);
  },
  
};

module.exports = dataMapper;