const settings = require("./settings"); // settings.json
const input = process.argv[2];

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

pg.select('*').from('famous_people').where('first_name',input).orWhere('last_name',input).asCallback(function(err, result) {
  if (err) return console.error(err, "Error");
  finalresult(result, input);
});

const finalresult = function(result, name){
  result.forEach((user,i) => {
      console.log(`- ${user.id} : ${user.first_name},${user.last_name}, born '${user.birthdate.toISOString().slice(0,10)}'`);
    })
}


