/// <reference types="cypress" />

import { PostsPage } from '../../support/pages/PostsPage';

export class NewPostPage {
    postsPage: PostsPage = new PostsPage();

    // Selectores página creación post
    postTitleField = 'input[placeholder="Enter your post title"]';
    postContentField = 'textarea[placeholder="Write your post content here..."]';
    createPostButton = 'button:contains("Create Post")';
    updatePostButton = 'button:contains("Update Post")';
    cancelPostButton = 'button:contains("Cancel")';
    titleRequiredMessage = 'p:contains("Title is required")';
    contentRequiredMessage = 'p:contains("Content is required")';
    titleLabelRequiredColor = 'label:contains("Title")';
    contentLabelRequiredColor = 'label:contains("Content")';

    // Métodos que contienen las acciones de la página de creación de posts
    verifyNewPostsPageIsDisplayed(): void {
        cy.url().should('include', '/posts/new');
    }

    createPost(title: string, content: string): void {
        this.postsPage.enterToCreatePost();
        cy.get(this.postTitleField).type(title);
        cy.get(this.postContentField).type(content);
        cy.get(this.createPostButton).click();
    }

    updatePost(title: string, content: string): void {
        this.postsPage.enterToUpdatePost();
        cy.get(this.postTitleField).clear().type(title);
        cy.get(this.postContentField).clear().type(content);
        cy.get(this.updatePostButton).click();
    }

    verifyCreatePostRequiredFields(): void {
        this.postsPage.enterToCreatePost();
        cy.get(this.createPostButton).click();
        cy.get(this.titleRequiredMessage).should('be.visible');
        cy.get(this.contentRequiredMessage).should('be.visible');
        cy.get(this.titleLabelRequiredColor).should('have.css', 'color', 'rgb(239, 68, 68)');
        cy.get(this.contentLabelRequiredColor).should('have.css', 'color', 'rgb(239, 68, 68)');
    }

    cancelPostCreation(): void {
        cy.get(this.cancelPostButton).click();
    }
}
