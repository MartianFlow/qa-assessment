/// <reference types="cypress" />


describe('Login Api Test', () => {

    it('successful login with existing user', () => {
        cy.loginAPI('testuser', 'testpassword', true)
            .then((response) => {
                expect(response.status).to.eq(200);
                // Validacion de keys en rs
                expect(response.body).to.have.all.keys('id', 'userId', 'token', 'createdAt');
                // Validacion tipo de dato para cada propiedad en rs
                expect(response.body.id).to.be.a('number');
                expect(response.body.userId).to.be.a('number');
                expect(response.body.token).to.be.a('string');
                expect(response.body.createdAt).to.be.a('string');
            });
    });

    it('login with existing user and wrong password', () => {
        cy.loginAPI('testuser', 'test1234', false)
            .then((response) => {
                expect(response.status).to.eq(422);
                // Validacion rs error controlado login
                expect(response.body).to.have.property('message', 'Invalid credentials');
                
            });
    });
    
    it('login with invalid user', () => {
        cy.loginAPI('testuser21', 'testpassword', false)
            .then((response) => {
                expect(response.status).to.eq(422);
                // Validacion rs error controlado login
                expect(response.body).to.have.property('message', 'Invalid credentials');
                
            });
    });
})