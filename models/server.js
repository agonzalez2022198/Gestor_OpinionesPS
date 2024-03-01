const express  = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.opinionPath = '/api/opinion';
        this.publicPath = '/api/publicacion';
        this.userPath = '/api/usuario';
        this.authPath = '/api/auth';

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
        this.app.use(this.publicPath, require('../routes/publicaciones.routes'));
        this.app.use(this.userPath, require('../routes/usuario.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutándose y escuchando el puerto', this.port);
        });
    }


}


module.exports = Server;