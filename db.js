var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "951458",
  database: "workshop"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO participantes (password_part, nome_participante, tel_participante, username_part, email_part) VALUES ('Vitor', 'vitor hugo', '324234', 'vivimofoka', 'asdfasdf' )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
