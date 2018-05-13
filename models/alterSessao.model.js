module.exports = {
	
	readSessao(nome, callback) {
		var sql = "SELECT * from sessoes where titulo_sessao=?";
		global.connection.query(sql, [nome], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
	
	updateSessao(data, callback) {
		var sql = "UPDATE sessoes SET desc_intro=?, text_intro=?, descricao_sessao=?, data_sessao=?, speaker_sessao=?, categoria=? WHERE titulo_sessao=?";
		global.connection.query(
			sql, [data.desc_intro, data.text_intro, data.descricao_sessao, data.data_sessao, data.speaker_sessao, data.categoria, data.titulo_sessao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	listFeedback(callback) {
		var sql = 'SELECT * from feedback';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},


	removeSessao(name, callback) {
		var sql = "DELETE from sessoes WHERE titulo_sessao=?";
		global.connection.query(sql, [name], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	createPatrocinio(data, callback) {
		var sql = "INSERT INTO patrocinador (nome_patrocinador, valor_doado ) VALUES (?,?)";
		global.connection.query(
			sql, [data.name, data.valor],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	listPatrocinadores(callback) {
		var sql = 'SELECT * from patrocinador';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	
	readPatrocinio(nome, callback) {
		var sql = "SELECT * from patrocinador where nome_patrocinador=?";
		global.connection.query(sql, [nome], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	
	
}