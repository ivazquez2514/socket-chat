var socket = io();

const params = new URLSearchParams( window.location.search );

if ( !params.has('nombre') || !params.has('sala') ) {

    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit( 'entrarChat', usuario, function( res ) {

        console.log('Usuarios conectados', res);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on( 'crearMensaje', function( res ) {

    console.log('Servidor:', res);

});

socket.on( 'listaPersonas', function( res ){

    console.log('La lista de usuarios se modificó:', res);
});

socket.on( 'mensajePrivado', function( mensaje ) {

    console.log('Mensaje privado', mensaje);
});