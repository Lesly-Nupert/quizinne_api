// Pour crypter le premier mot de passe de la bdd pour tester /login en POST
// sinon Bcrypt est est inclu dans le authController pour l'inscription des nouveaux membres

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  const passwords = ['Leslyqui7+']; 
  const hashedPasswords = await Promise.all(passwords.map(hashPassword));

  hashedPasswords.forEach((hashedPassword, index) => {
    console.log(`Mot de passe ${index + 1}: ${hashedPassword}`);
  });
}

main();