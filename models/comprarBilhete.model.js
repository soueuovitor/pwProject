module.exports = {

comprarBilhete(data, callback) {
		var sql = "INSERT INTO bilhetes (data_bilhete, username_comprador) VALUES (?,?)";
		global.connection.query(
			sql, [data.dia, data.user],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	workshop(callback) {
		var sql = 'SELECT * from workshop';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	readUser(username, callback) {
		var sql = "SELECT * from users where username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},







	listBilhetes(callback) {

		var sql = 'SELECT  username_comprador, DATE_FORMAT(data_bilhete, "%Y-%m-%d") AS data_bilhete from bilhetes';
		global.connection.query(sql, function (error, rows, fields) {

console.log(rows[0])

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

	
	listDias(callback) {
		
		var sql = 'SELECT * from dia';
		global.connection.query(sql, function (error, rows, fields) {
		
	
			callback(rows);
		});
	}





	
	
}