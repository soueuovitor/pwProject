module.exports = {

	listDias(callback) {

		var sql = 'SELECT  * from dia';
		global.connection.query(sql, function (error, rows, fields) {



			callback(rows);
		});
	},




	readParticipante(username, callback) {
		var sql = "SELECT * from participantes where username_part=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},





	listWorkshop(callback) {


		var sql = 'SELECT * from workshop';
		global.connection.query(sql, function (error, rows, fields) {



			callback(rows);
		});
	},

	
	listSpeakers(callback) {

		var sql = 'SELECT * from speakers';
		global.connection.query(sql, function (error, rows, fields) {



			callback(rows);
		});
	},

	listSessoes(callback) {
		var sql = 'SELECT * from sessoes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			rows.sort((a, b) => {

				if (a.data_sessao < b.data_sessao)
					return -1

				if (a.data_sessao > b.data_sessao)
					return 1

				if (a.data_sessao.toLocaleDateString() == b.data_sessao.toLocaleDateString()) {
					var timeA = a.hora_inicio;
					var horaA = timeA.substring(0, 2) + timeA.substring(3, 5);
					var timeB = b.hora_inicio;
					var horaB = timeB.substring(0, 2) + timeB.substring(3, 5);

					if (horaA < horaB)
						return -1

					if (horaA > horaB)
						return 1

					return 0


				}
			});

			callback(rows);
		});
	},

	listPatrocinadores(callback) {

		var sql = 'SELECT * from patrocinador';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;

			callback(rows);
		});
	}


}