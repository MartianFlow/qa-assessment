/// <reference types="cypress" />


describe('Register User Api Test', () => {

    it('successful user creation', () => {
        const username = `testuser_${Math.random().toString(36).substring(7)}`; // NOSONAR
        cy.registerAPI(username, 'password123', true)
            .then((response) => {
                expect(response.status).to.eq(200);
                // Validacion de keys en rs
                expect(response.body).to.have.all.keys('id', 'userId', 'token', 'createdAt');
                
                // Validacion tipo de dato para cada propiedad en rs
                expect(response.body.id).to.be.a('number');
                expect(response.body.userId).to.be.a('number');
                expect(response.body.token).to.be.a('string');
                expect(response.body.createdAt).to.be.a('string');

                
                // Tarea para eliminar el usuario creado en la prueba
                const inMemory = Cypress.env('DB_MODE') === 'memory';
                console.log(inMemory);
                if(!inMemory) {
                    cy.task('deleteUser', username).then((changes) => {
                        expect(changes).to.be.greaterThan(0);
                    });
                }
            });
    });

    it('validate required username and password', () => {
        cy.registerAPI('', '', false)
            .then((response) => {
                expect(response.status).to.eq(422);
                
                // Validacion campos de rs username requerido
                expect(response.body.errors[0]).to.have.property('code', 'too_small');
                expect(response.body.errors[0]).to.have.property('message', 'String must contain at least 3 character(s)');

                // Validacion campos de rs password requerido
                expect(response.body.errors[2]).to.have.property('code', 'too_small');
                expect(response.body.errors[2]).to.have.property('message', 'String must contain at least 8 character(s)');

            });
    });
})