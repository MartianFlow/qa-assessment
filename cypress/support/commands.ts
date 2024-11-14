/// <reference types="cypress" />
/// <reference types="../../cypress/support/commands" />


Cypress.Commands.add('loginAPI', (username: string, password: string, failOnStatusCode: boolean) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('localBaseUrl')}/auth/login`,
        body: {
            username,
            password,
        },
        failOnStatusCode
    }).then((response) => {
        Cypress.env('authToken', response.body.token);
    });
});

Cypress.Commands.add('registerAPI', (username: string, password: string, failOnStatusCode: boolean) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('localBaseUrl')}/users`,
        body: {
            username,
            password,
        },
        failOnStatusCode
    }).then((response) => {
        Cypress.env('authToken', response.body.token);
    });
});

Cypress.Commands.add('postCreationAPI', (title: string, content: string) => {
    const authToken = Cypress.env('authToken');

    return cy.request({
        method: 'POST',
        url: `${Cypress.env('localBaseUrl')}/posts`,
        headers: {
            Authorization: authToken,
        },
        body: {
            title,
            content,
        },
    }).then((response) => {
        Cypress.env('postId', response.body.id);
    });
});

Cypress.Commands.add('getPostAPI', () => {
    const authToken = Cypress.env('authToken');

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('localBaseUrl')}/posts`,
        headers: {
            Authorization: authToken,
        }
    });
});

Cypress.Commands.add('postUpdateAPI', (title: string, content: string) => {
    const authToken = Cypress.env('authToken');

    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('localBaseUrl')}/posts/${Cypress.env('postId')}`,
        headers: {
            Authorization: authToken,
        },
        body: {
            title,
            content,
        },
    });
});

Cypress.Commands.add('postDeleteAPI', (title: string, content: string) => {
    const authToken = Cypress.env('authToken');

    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('localBaseUrl')}/posts/${Cypress.env('postId')}`,
        headers: {
            Authorization: authToken,
        },
        body: {
            title,
            content,
        },
    });
});

Cypress.Commands.add('cleanupPosts', () => {
    const authToken = Cypress.env('authToken');

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('localBaseUrl')}/posts`,
        headers: {
            Authorization: authToken,
        },
    }).then((response) => {
        const posts = response.body as Array<{ id: string }>;
        posts.forEach((post) => {
            cy.request({
                method: 'DELETE',
                url: `${Cypress.env('localBaseUrl')}/posts/${post.id}`,
                headers: {
                    Authorization: authToken,
                },
            });
        });
    });
});