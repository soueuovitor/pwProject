module.exports = {

		listSpeakers(callback) {
		var sql = 'SELECT * from speakers';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	
	listFeedback(callback) {
		var sql = 'SELECT * from feedback';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	createSpeakers(data, callback) {
		var sql = "INSERT INTO speakers (nome_speaker, morada_speaker, email_speaker, numero_speaker, cache_speaker, introducao ) VALUES (?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.cache, data.introducao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
		emailExists(email, callback) {

		var sql = "SELECT * FROM speakers WHERE email_speaker=?";
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