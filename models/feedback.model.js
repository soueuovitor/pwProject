module.exports = {

	listFeedback(callback) {
		var sql = 'SELECT * from feedback';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	}
	

}