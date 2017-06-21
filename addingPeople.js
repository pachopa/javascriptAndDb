const settings = require("./settings"); // settings.json
const FirstName = process.argv[2];
const LastName = process.argv[3];
const BirthDate = process.argv[4];
const pg = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});


 pg('famous_people').insert({first_name: FirstName, last_name: LastName, birthdate: BirthDate}).then(function(){
  console.log(FirstName, LastName,  BirthDate);
 })

pg.destroy();
