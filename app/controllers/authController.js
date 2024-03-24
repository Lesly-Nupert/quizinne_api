const dataMapper = require("../database/datamapper");
const emailValidator = require("email-validator");
// Bibliothque qui hache les mots de passe
const bcrypt = require("bcryptjs");
const salt = 10;
// Authentification des utilisateurs via JWT
const jwt = require("jsonwebtoken");
// Sanitize les données pour contrer attaque XSS
const sanitizeHtml = require('sanitize-html');

const authController = {
  // INSCRIPTION
  async postSignup(req, res) {
    try {
      const pseudo = sanitizeHtml(req.body.pseudo);
      const email = sanitizeHtml(req.body.email);
      const password = req.body.password;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;

      if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Adresse email invalide." });
      }

      if (!pseudo) {
        return res.status(400).json({ error: "Le pseudo est obligatoire." });
      }

      if (!password) {
        return res
          .status(400)
          .json({ error: "Le mot de passe est obligatoire." });
      }

      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .json({
            error:
              "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial",
          });
      }

      const hashedPassword = await bcrypt.hash(password, salt);
      await dataMapper.createUser({ pseudo, email, password: hashedPassword });

      res.status(200).json({ message: "Inscription validée !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // CONNEXION
  async postLogin(req, res) {
    try {
      const email = sanitizeHtml(req.body.email);
      const password = req.body.password;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;

      if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Adresse email invalide." });
      }

      if (!password) {
        return res
          .status(400)
          .json({ error: "Le mot de passe est obligatoire." });
      }

      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .json({
            error:
              "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial",
          });
      }

      const user = await dataMapper.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res
          .status(401)
          .json({ error: "Utilisateur ou mot de passe incorrect !" });
      } else {
        const token = jwt.sign(
          { userId: user.id_member },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res
          .status(200)
          .json({
            message: "Connexion réussie !",
            token,
            userId: user.id_member,
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Infos personnelles du membre
  showOneUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userDetails = await dataMapper.getOneUser(userId);
      if (!userDetails) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Mise à jour des identifiants
  updateOneUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updateData = {
        pseudo: sanitizeHtml (req.body.pseudo),
        email: sanitizeHtml (req.body.email),
      };
      
      await dataMapper.updateUser(userId, updateData);
      res
        .status(200)
        .json({ message: "Compte utilisateur mis à jour avec succès" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Erreur serveur lors de la mise à jour du compte utilisateur",
        });
    }
  },

  // Mise à jour du mot de passe
  updatePassword: async (req, res) => {
    try {
      const { userId } = req.user;
      const { oldPassword, newPassword } = req.body;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Le mot de passe est obligatoire." });
      }

      if (!passwordRegex.test(oldPassword) || !passwordRegex.test(newPassword)) {
        return res
          .status(400)
          .json({
            error:
              "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial",
          });
      }

      const user = await dataMapper.getOneUser(userId);

      if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
        return res
          .status(401)
          .json({ error: "Ancien mot de passe incorrect." });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      await dataMapper.changePassword(userId, hashedNewPassword);

      res.status(200).json({ message: "Mot de passe modifié avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // Suppression d'un membre
  deleteOneUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      await dataMapper.deleteUser(userId);
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Erreur serveur lors de la suppression de l'utilisateur",
        });
    }
  },
};

module.exports = authController;