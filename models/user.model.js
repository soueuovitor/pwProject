module.exports = {
	list(callback) {
		var sql = 'SELECT * from users';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	listWorkshop(callback) {
		var sql = 'SELECT * from workshop';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},


	read(username, callback) {
		var sql = "SELECT * from users where username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},


	readGoogle(id, callback) {
		var sql = "SELECT * from participantes where id_participante=?";
		global.connection.query(sql, [id], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
	create(data, callback) {
		var sql = "INSERT INTO participantes (password_part, nome_participante, tel_participante, username_part, email_part) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.password, data.name, data.numero, data.username, data.email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},






	createGoogle(data, callback) {
		var sql = "INSERT INTO participantes ( nome_participante, username_part, email_part, id_participante, password_part) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.nome, data.username, data.email, data.id, data.password],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},


	
	createFeedback(data, callback) {
		var sql = "INSERT INTO feedback ( nome_pessoal, email_pessoal, mensagem) VALUES (?,?,?)";
		global.connection.query(
			sql, [data.nome, data.email, data.mensagem],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},


	comprarBilhete(data, callback) {
		var sql = "INSERT INTO bilhetes (data_bilhete, username_comprador) VALUES (?,?)";
		global.connection.query(
			sql, [data.dia, data.user],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	emailExists(email, callback) {

		var sql = "SELECT * FROM users WHERE email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].email === email) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	createColab(data, callback) {
		var sql = "INSERT INTO participantes (password_part, nome_participante, tel_participante, username_part, email_part) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.password, data.name, data.numero, data.username, data.email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	readParticipante(username, callback) {
		var sql = "SELECT * from participantes where username_part=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},


	updateParticipante(username, data, callback) {
		var sql = "UPDATE participantes SET nome_participante=?, email_part=?, password_part=?, tel_participante=?, username_part=? WHERE id_participante=?";
		global.connection.query(
			sql, [data.name, data.email, data.password, data.telemovel, data.username, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	remove(username, callback) {
		var sql = "DELETE from users WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	/*
	takenUsername(username, callback) {
	    
	    var sql = "SELECT password FROM participantes WHERE username=?"
	    var user = global.connection.query(SQL, [username] );
	                                       
	                                       
	                function bit (error, rows, fields){
				     if (user === undefined)  {callback(true);
	                    }else{
	                        callback(false);
	                    }
	    }
	},
	                   
	*/



	listDias(callback) {

		var sql = 'SELECT * from dia';
		global.connection.query(sql, function (error, rows, fields) {
var me = [];
		
			for (var e of rows){
				var str = e.data.toLocaleDateString() ;
				var c = str.substring(0, 5);
				me.push(str);	;



			}
			callback(rows);
			console.log(me);
		});
	},


	listPatrocinadores(callback) {

		var sql = 'SELECT * from patrocinador';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			
			callback(rows);
		});
	},



	usernameExists(username, callback) {

		var sql = "SELECT * FROM users WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].username === username) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},




	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT password FROM users WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	
	updateUsers(data, callback) {
		var sql = "UPDATE users SET name=?, email=? , password=? WHERE username=?";
		global.connection.query(
			sql, [data.name,  data.email , data.password , data.username],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	listUsers(callback) {
		var sql = 'SELECT * from users';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	
	readUsers(nome, callback) {
		var sql = "SELECT * from users where nome=?";
		global.connection.query(sql, [nome], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
};