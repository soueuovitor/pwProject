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
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, salario_colab,password_col,username_col, horas_trabalho_diario, funcao, system_admin) VALUES (?,?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, 0, data.password, data.username, data.horario, data.funcao,data.admin],
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
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, salario_colab, nif_colaborador,  password_col,pago, username_col, horas_trabalho_diario, funcao, system_admin) VALUES (?,?,?,?,?,?,?,?,?,?, ?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.salario, data.nif, data.password, 1, data.username, data.horario, data.funcao, data.admin],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	createColabPago2(data, callback) {
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador,salario_colab, nif_colaborador,  password_col,pago, username_col, horas_trabalho_diario, funcao, system_admin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.salario,data.nif, data.password, 1, data.username, data.horario, data.funcao,data.admin],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	}

}