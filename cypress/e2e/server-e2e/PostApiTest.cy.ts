/// <reference types="cypress" />


describe('Post CRUD Api Test', () => {
    beforeEach(() => {
        cy.loginAPI('testuser', 'testpassword', true);
      });


    it('create valid post', () => {
        cy.postCreationAPI('titlePostTest', 'contentPostTest')
            .then((response) => {
                expect(response.status).to.eq(201);
                // Validacion de keys en rs
                expect(response.body).to.have.all.keys('id', 'authorId', 'title', 'content', 'createdAt', 'updatedAt');
                // Validacion valores en rs
                expect(response.body).to.have.property('authorId', 1);
                expect(response.body).to.have.property('title', 'titlePostTest');
                expect(response.body).to.have.property('content', 'contentPostTest');
               
            });
    });

    it('get created posts', () => {
        cy.getPostAPI()
            .then((response) => {
                expect(response.status).to.eq(200);
                // Cantidad de post para el usuario
                expect(response.body).to.have.length(1);
                // Validacion de keys en rs
                expect(response.body[0]).to.have.all.keys('id', 'authorId', 'title', 'content', 'createdAt', 'updatedAt');
                // Validacion valores en rs
                expect(response.body[0]).to.have.property('authorId', 1);
                expect(response.body[0]).to.have.property('title', 'titlePostTest');
                expect(response.body[0]).to.have.property('content', 'contentPostTest');
               
            });
    });

    it('update valid post', () => {
        cy.postUpdateAPI('updatePostTest', 'updatePostTest')
            .then((response) => {
                expect(response.status).to.eq(200);
                // Validacion de keys en rs
                expect(response.body).to.have.all.keys('id', 'authorId', 'title', 'content', 'createdAt', 'updatedAt');
                // Validacion valores en rs
                expect(response.body).to.have.property('authorId', 1);
                expect(response.body).to.have.property('title', 'updatePostTest');
                expect(response.body).to.have.property('content', 'updatePostTest');
               
            });
    });

    it('delete valid post', () => {
        cy.postDeleteAPI('updatePostTest', 'updatePostTest')
            .then((response) => {
                expect(response.status).to.eq(200);

                // Validacion valores en rs
                expect(response.body).to.have.property('message', 'Post deleted');
               
            });
    });
})