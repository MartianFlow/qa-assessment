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
  post: { 
    title: string; 
    content: string 
  };
  updatePost: {
    newTitle: string,
    newContent: string
  } 
};

describe('Posts Module Integration Tests', () => {
  before(() => {
    cy.fixture('postModuleData').then((data) => {
        testData = data;
      });
  });

  beforeEach(() => {
    cy.loginAPI(testData.user.username, testData.user.password, true);
    cy.cleanupPosts();
    loginPage.visitLoginPage();
    loginPage.login(testData.user.username, testData.user.password);
    postsPage.verifyPostsPageIsDisplayed();
  });

  it('displays correct layout and elements', () => {
    postsPage.verifyLayoutElements();
  });

  it('shows empty state when no posts exist', () => {
    postsPage.verifyEmptyPostListMessage();
  });

  it('displays posts in correct format', () => {
    newPostPage.createPost(testData.post.title, testData.post.content);
    postsPage.verifyPostInList(testData.post.title, testData.post.content);
    postsPage.verifyPostCardElements();
  });

  it('supports post management actions', () => {
    postsPage.enterToCreatePost();
    newPostPage.verifyNewPostsPageIsDisplayed();
    newPostPage.cancelPostCreation();
    postsPage.verifyPostsPageIsDisplayed();
  });

  it('navigation works correctly', () => {
    postsPage.navigateToProfile();
    postsPage.navigateToPosts();
    postsPage.logout();
  });

  //E2E Test
  it('create, update and delete post', () => {
    newPostPage.createPost(testData.post.title, testData.post.content);
    newPostPage.updatePost(testData.updatePost.newTitle, testData.updatePost.newContent )
    postsPage.verifyPostInList(testData.updatePost.newTitle, testData.updatePost.newContent);
    postsPage.deletePost();
    postsPage.verifyEmptyPostListMessage();
  })

  afterEach(() => {
    cy.cleanupPosts();
  });

  after(() => {
    const authToken = Cypress.env('authToken');
    cy.request({
      method: 'POST',
      url: `http://localhost:3000/auth/logout`,
      headers: {
        Authorization: authToken,
      },
    });
  });
});