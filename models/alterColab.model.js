module.exports = {
	
	readColab(username, callback) {
		var sql = "SELECT * from colaboradores where username_col=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
	
	listColaboradores(callback) {
		var sql = 'SELECT * from colaboradores';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	updateColab(data, callback) {
		var sql = "UPDATE  colaboradores SET nome_colaborador=?, morada_colaborador=? ,email_colaborador=? , numero_colaborador=? ,pago=? , nif_colaborador=?, salario_colab=?, horas_trabalho_diario=? WHERE username_col=?";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, 0, null, 0, data.horario, data.username],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	updateColabPago(data, callback) {
		var sql = "UPDATE colaboradores SET nome_colaborador=?, morada_colaborador=?,email_colaborador=?, numero_colaborador=?, salario_colab=?, nif_colaborador=?,pago=?, horas_trabalho_diario=? where username_col=?";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.salario, data.nif, 1, data.horario, data.username],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	createColab(data, callback) {
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, salario_colab,password_col,username_col, horas_trabalho_diario, funcao) VALUES (?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, null, data.password, data.username, data.horario, data.funcao],
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

	createColabPago(data, callback) {
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, salario_colab, nif_colaborador,  password_col,pago, username_col, horas_trabalho_diario, funcao) VALUES (?,?,?,?,?,?,?,?,?,?, ?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.salario, data.nif, data.password, 1, data.username, data.horario, data.funcao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	createColabPago2(data, callback) {
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, nif_colaborador,  password_col,pago, username_col, horas_trabalho_diario, funcao) VALUES (?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.nif, data.password, 1, data.username, data.horario, data.funcao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	removeColaborador(id, callback) {


		var sql = "UPDATE colaboradores SET deleted=? where id_colaborador=?";
		global.connection.query(
			sql, [1, id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	}
	

}