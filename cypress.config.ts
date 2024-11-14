const { defineConfig } = require("cypress");
import sqlite3 = require('sqlite3');



module.exports = defineConfig({
  e2e: {
    // Configuracion del soporte de sesión y origen experimental
    experimentalSessionAndOrigin: true,
    experimentalSessionSupport: true,
    viewportWidth: 1368,
    viewportHeight: 720,
    reporter: 'mochawesome',
    setupNodeEvents(on, config) {
      const db = sqlite3.verbose();
      const database = new db.Database('./database.sqlite');

      on('task', {
        deleteUser(username: string) {
          return new Promise((resolve, reject) => {
            database.run(`DELETE FROM users WHERE username = ?`, username, function (err) {
              if (err) {
                return reject(err);
              }
              resolve(this.changes); // Devuelve el número de filas afectadas
            });
          });
        },
      });

      return config;
     
    },
  },
  env: {
    localBaseUrl: "http://localhost:3000"
  }
});