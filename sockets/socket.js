const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
// creando las bandas de musica 
bands.addBand( new Band( 'Silvestre Dangond' ));
bands.addBand( new Band( 'Los Betos' ));
bands.addBand( new Band( 'Diomedes Diaz' ));
bands.addBand( new Band( 'Los Zuleta' ));

console.log(bands);

// Mensaje de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    // enviando las bandas a los clientes que se conecten
    client.emit('Active-bands', bands.getBands() );
    // votando por una banda
    client.on('vote-band',(payload) => {
        // console.log(payload.id);
        bands.voteBand(payload.id);
         // avisandole a todos los clientes conectados 
        io.emit('Active-bands', bands.getBands() );
    });
    // agregando una banda
    client.on('add-band',(payload) => {
        // console.log(payload);
        
        bands.addBand(new Band(payload.name));
         // avisandole a todos los clientes conectados 
        io.emit('Active-bands', bands.getBands() );
    });
    // eliminando una banda
    client.on('delete-band',(payload) => {
        console.log(payload);
        
        bands.deleteBand(payload.id);
         // avisandole a todos los clientes conectados 
        io.emit('Active-bands', bands.getBands() );
    });


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload['nombre']);
        //notificando a todos que recibio un mensaje
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });
    client.on('emitir-mensaje',(payload)=>{
        
        //notificando a todos que recibio un mensaje
        // io.emit('nuevo-mensaje',{admin:payload});
        
        // emite a todos menos quien lo envio
        client.broadcast.emit('nuevo-mensaje',payload);
    });

  });