const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            
            port: 3306,
          
            user: 'root',
          
            password: '',
            database: 'employee_db',
        });    
    }
}