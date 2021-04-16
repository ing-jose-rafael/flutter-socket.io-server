const {io} = require('../index');

// Mensaje de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload['nombre']);
        //notificando a todos que recibio un mensaje
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

  });