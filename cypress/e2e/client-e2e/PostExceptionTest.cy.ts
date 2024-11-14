/// <reference types="cypress" />

import { LoginPage } from '../../support/pages/LoginPage';
import { NewPostPage } from '../../support/pages/NewPostPage';
import { PostsPage } from '../../support/pages/PostsPage';

const loginPage = new LoginPage();
const postsPage = new PostsPage();
const newPostPage = new NewPostPage();

let testData: { 
  user: { 
    username: string; 
    password: string 
  }; 
};

describe('Login and Post Module Exception Tests', () => {

beforeEach(() => {
    loginPage.visitLoginPage();
    cy.fixture('postModuleData').then((data) => {
      testData = data;
    });
  });

  it('shows error when sending empty login fields', () => {
    loginPage.verifyLoginRequiredFields();
  })

  it('shows error when enter invalid user', () => {
    loginPage.verifyInvalidLogin("invalidUser", "123123123");
  })

  it('shows error when sending empty fields in post creation', () => {
    loginPage.login(testData.user.username, testData.user.password);
    newPostPage.verifyCreatePostRequiredFields();
  })
})