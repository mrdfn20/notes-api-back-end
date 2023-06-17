/* eslint-disable quotes */
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes'); //import hapi plugin notes buatan kita
const Notesservice = require('./services/inMemory/NotesService');
const NotesValidator = require('./validator/notes'); //import plugin validation

const init = async () => {
  const notesService = new Notesservice();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // assign hapi plugin
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
