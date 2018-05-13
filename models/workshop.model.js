module.exports = {
	list(callback) {
		var sql = 'SELECT * from bilhetes';
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
	/*

		countTickets(callback){
			var sql = "SELECT  *  FROM bilhetes";
			
			global.connection.query(sql,function (error, rows, fields) {
				
			if (error) throw error;
				callback(rows);
		});
			



		},
		*/


	readColab(username, callback) {
		var sql = "SELECT * from colaboradores where username_col=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	readSpeaker(email, callback) {
		var sql = "SELECT * from speakers where email_speaker=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},


	readPatrocinio(nome, callback) {
		var sql = "SELECT * from patrocinador where nome_patrocinador=?";
		global.connection.query(sql, [nome], function (error, rows, fields) {
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






	listParticipantes(callback) {
		var sql = 'SELECT * from participantes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},



	/*
		read(username, callback) {
			var sql = "SELECT * from users where username=?";	
			global.connection.query(sql, [username], function(error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);			
			});
		},	
	*/
	create(data, callback) {
		var sql = "INSERT INTO participantes (password_part, nome_participante, tel_participante, username_part, email_part) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.password, data.name, data.numero, data.username, data.email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
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


	
	emailExistsSpeaker(email, callback) {
		
				var sql = "SELECT * FROM speakers WHERE email_speaker=?";
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
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, salario_colab,password_col,username_col, horas_trabalho_diario, funcao) VALUES (?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, 0, data.password, data.username, data.horario, data.funcao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
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
		var sql = "INSERT INTO colaboradores (nome_colaborador, morada_colaborador,email_colaborador, numero_colaborador, nif_colaborador,  password_col,pago, username_col, horas_trabalho_diario, funcao) VALUES (?,?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.nif, data.password, 1, data.username, data.horario, data.funcao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	update(data, callback) {
		var sql = "UPDATE users SET name=?, email=?, password=? WHERE username=?";
		global.connection.query(
			sql, [data.name, data.email, data.password, username],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
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

	updateSpeaker(data, callback) {
		var sql = "UPDATE speakers SET nome_speaker=?, morada_speaker=? ,email_speaker=?  , numero_speaker=? ,cache_speaker=? WHERE id_speaker=?";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.cache , data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	updatePatrocinador(data, callback) {
		var sql = "UPDATE patrocinador SET valor_doado=? WHERE nome_patrocinador=?";
		global.connection.query(
			sql, [data.valor, data.name],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},


	updateNome(data, callback) {
		var sql = "UPDATE workshop SET nome_workshop=? WHERE id_workshop=?";
		global.connection.query(
			sql, [data.nome, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},


	updatePreco(data, callback) {
		var sql = "UPDATE workshop SET preco=? WHERE id_workshop=?";
		global.connection.query(
			sql, [data.preco, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},



	updateOcupacao(data, callback) {
		var sql = "UPDATE workshop SET max_bilhetes_dia=? WHERE id_workshop=?";
		global.connection.query(
			sql, [data.ocupacao, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	updateSalario(data, callback) {
		var sql = "UPDATE workshop SET salario_predefinido=? WHERE id_workshop=?";
		global.connection.query(
			sql, [data.salario, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},
	
	removePatrocinio(name, callback) {
		var sql = "DELETE from patrocinador WHERE nome_patrocinador=?";
		global.connection.query(sql, [name], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	
	removeColaborador(id, callback) {
		var sql = "DELETE from colaboradores WHERE id_colaborador=?";
		global.connection.query(sql, [id], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
		
	removeSpeaker(email, callback) {
		var sql = "DELETE from speakers WHERE email_speaker=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
        
    removeDia(data, callback) {
		var sql = "DELETE from dia WHERE data=?";
		global.connection.query(sql, [data], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	dayExists(data, callback) {

		var sql = "SELECT * FROM dia WHERE data=?";
		global.connection.query(sql, [data], function (error, rows, fields) {
			console.log(rows[0])
			if (error) throw error;
		
			if (rows.length != 0 ) {
				callback(false);
			} else {
				callback(true);
			}

		});
	},

	remove(name, callback) {
		var sql = "DELETE from patrocinador WHERE nome_patrocinador=?";
		global.connection.query(sql, [name], function (error, rows, fields) {
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


	createPatrocinio(data, callback) {
		var sql = "INSERT INTO patrocinador (nome_patrocinador, valor_doado ) VALUES (?,?)";
		global.connection.query(
			sql, [data.name, data.valor],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
    },
    createDia(data, callback) {
		var sql = "INSERT INTO dia (data) VALUES (?)";
		global.connection.query(
			sql, [data.data],
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
    
	
	workshop(callback) {
		var sql = 'SELECT * from workshop';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	

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
		

	listParticipantes(callback) {
		var sql = 'SELECT * from participantes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},


	createSpeakers(data, callback) {
		var sql = "INSERT INTO speakers (nome_speaker, morada_speaker, email_speaker, numero_speaker, cache_speaker ) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.morada, data.email, data.numero, data.cache],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	listSpeakers(callback) {
		var sql = 'SELECT * from speakers';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
};