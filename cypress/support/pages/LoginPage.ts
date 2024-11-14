/// <reference types="cypress" />

export class LoginPage {
    // Selectores página login
    usernameField = 'input[placeholder="Username"]';
    passwordField = 'input[placeholder="Password"]';
    signInButton = 'button';
    usernameRequiredMessage = 'p:contains("String must contain at least 3 character(s)")';
    passwordRequiredMessage = 'p:contains("String must contain at least 8 character(s)")';
    usernameLabelRequiredColor = 'label:contains("Username")';
    passwordLabelRequiredColor = 'label:contains("Password")';
    invalidCredentialsMessage = 'div:contains("Invalid credentials")';

    // Métodos que contienen las acciones de la página de login
    visitLoginPage(): void {
        cy.visit('http://localhost:4200/login');
    }

    login(username: string, password: string): void {
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.signInButton).contains('Sign in').click();
    }

    verifyLoginRequiredFields(): void {
        cy.get(this.signInButton).contains('Sign in').click();
        cy.get(this.usernameRequiredMessage).should('be.visible');
        cy.get(this.passwordRequiredMessage).should('be.visible');
        cy.get(this.usernameLabelRequiredColor).should('have.css', 'color', 'rgb(239, 68, 68)');
        cy.get(this.passwordLabelRequiredColor).should('have.css', 'color', 'rgb(239, 68, 68)');
    }

    verifyInvalidLogin(username: string, password: string): void {
        this.login(username, password);
        cy.get(this.invalidCredentialsMessage).should('be.visible');

    }

}
