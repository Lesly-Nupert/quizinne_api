// CONNEXION PostgreSQL via pg
const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL_LOCAL);
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
module.exports = client;
