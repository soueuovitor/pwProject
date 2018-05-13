module.exports = {

    listSessoes(callback) {
        var sql = 'SELECT * from sessoes';
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
    },

    listSalas(callback) {

        var sql = 'SELECT * from salas';
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
    tittleExists(tittle, callback) {

        var sql = "SELECT * FROM sessoes WHERE titulo_sessao=?";
        global.connection.query(sql, [tittle], function (error, rows, fields) {
            if (error) throw error;
            if (rows.length == 1 && rows[0].titulo_sessao === tittle) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    horaExists(data,callback){
        var sql = "SELECT * from sessoes WHERE data_sessao=? and sala=?  and (? >= hora_inicio and ? <= duracao or ? >= hora_inicio and ? <= duracao or ? < hora_inicio and ? > duracao)";
        global.connection.query(
            sql, [data.data, data.sala, data.inicio, data.inicio, data.fim, data.fim, data.inicio, data.fim],
            function (error, rows, fields) {
                if (error) throw error;
                if (rows.length != 0 ) {
                    callback(true);
                } else {
                    callback(false);
                }
                console.log(rows.length);
                
            });
    },

	listFeedback(callback) {
		var sql = 'SELECT * from feedback';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},



    



    createSessao(data, callback) {
        var sql = "INSERT INTO sessoes (titulo_sessao, desc_titulo, texto_intro, descricao_sessao, data_sessao,speaker_sessao,hora_inicio,duracao, categoria, sala, caminho) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        global.connection.query(
            sql, [data.titulo, data.desc_titulo, data.texto_intro, data.descricao, data.data, data.speaker, data.inicio, data.fim, data.categoria, data.sala, data.caminho],
            function (error, rows, fields) {
                if (error) throw error;
                callback(rows[0]);
            });
    }


}