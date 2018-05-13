module.exports = {
	
	readColab(username, callback) {
		var sql = "SELECT * from colaboradores where username_col=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
	listWorkshop(callback) {
		var sql = 'SELECT * from workshop';
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

	
	listColaboradores(callback) {
		var sql = 'SELECT * from colaboradores';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	}
	
}