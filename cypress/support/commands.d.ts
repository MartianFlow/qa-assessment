/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      loginAPI(username: string, password: string, failOnStatusCode: boolean): Chainable<any>;
      registerAPI(username: string, password: string, failOnStatusCode: boolean): Chainable<any>;
      postCreationAPI(title: string, content: string): Chainable<any>;
      getPostAPI(): Chainable<any>;
      postUpdateAPI(title: string, content: string): Chainable<any>;
      postDeleteAPI(title: string, content: string): Chainable<any>;
      cleanupPosts(): Chainable<any>;
      
    }
  }
}