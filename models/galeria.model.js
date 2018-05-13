module.exports = {
	
	readImagens(callback) {
		var sql = "SELECT * from galeria";
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
    

    createFoto(data, callback) {
		var sql = "INSERT INTO galeria (nome_foto, caminho) VALUES (?,?)";
		global.connection.query(
			sql, [data.name, data.path],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	

	removePhoto(name, callback) {
		var sql = "DELETE from galeria WHERE caminho=?";
		global.connection.query(sql, [name], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
}