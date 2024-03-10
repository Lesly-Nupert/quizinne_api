const mainController = {
    homePage(req, res) {
      res.status(200).json("Bienvenue sur l'API de Quizine");
    },
  };
  module.exports = mainController;