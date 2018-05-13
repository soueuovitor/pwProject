module.exports = {

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
	


	create(data, callback) {
		var sql = "INSERT INTO participantes (password_part, nome_participante, tel_participante, username_part, email_part) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.password, data.name, data.numero, data.username, data.email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	updateParticipanteLost(data, callback) {
		var sql = "UPDATE participantes SET  password_part=? WHERE email_part=?";
		global.connection.query(
			sql, [ data.password, data.email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	updateParticipante(data, callback) {
		var sql = "UPDATE participantes SET nome_participante=?, tel_participante=? where id_participante=?";
		global.connection.query(
			sql, [data.name, data.telemovel, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	

	updateParticipantePass(data, callback) {
		var sql = "UPDATE participantes SET nome_participante=?, tel_participante=?, password_part=? where id_participante=?";
		global.connection.query(
			sql, [data.name, data.telemovel,data.password, data.id],
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
	}

}