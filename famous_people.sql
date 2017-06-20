const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  client.query(`SELECT * FROM famous_people WHERE first_name = $1`, [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printOutTheResult(result, name);
    client.end();
  });
});

function printOutTheResult(result, name) {
  console.log("Found " + result.rowCount+ " person(s) by the name : " + name);
  result.rows.forEach(function(value, index) {
    console.log("- " + result.rows[index].id + " : " + result.rows[0].first_name + " " + result.rows[index].last_name + ", " + "born " + result.rows[index].birthdate.toISOString().slice(0,10));
  });
}