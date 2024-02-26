const express  = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.opinionPath = '/api/opinion';

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


    router(){
        this.app.use(this.opinionPath, require('../routes/opiniones.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutándose y escuchando el puerto', this.port)
        });
    }


}


module.exports = Server;