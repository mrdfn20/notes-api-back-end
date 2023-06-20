/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes'); //import hapi plugin notes buatan kita
// const Notesservice = require('./services/inMemory/NotesService'); //in ram memory
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes'); //import plugin validation
// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    // port: 5000,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
    host: process.env.HOST,
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
