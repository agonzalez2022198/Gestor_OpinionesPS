const express  = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();
        this.middlewares();
        this.router();

    }

    async conectarDB (){
        await dbConnection();
    }


    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes(){

    }


}


module.exports = Server;