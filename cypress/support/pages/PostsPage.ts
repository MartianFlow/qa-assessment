/// <reference types="cypress" />

export class PostsPage {
    

    // Selectores página posts
    postsHeader = 'h1';
    createPostButton = 'button:contains("Create Post")';
    profileLink = 'a:contains("Profile")';
    postsLink = 'a:contains("Posts")';
    logoutButton = 'button:contains("Logout")';
    noPostsMessage = 'No posts found. Create your first post!';
    postCard = 'div[role="article"]';
    postTitle = 'h3';
    postContent = 'p';
    editPostButton = '.edit-button';
    deletePostButton = '.delete-button';

    // Métodos con acciones de la página de bandeja de posts
    verifyPostsPageIsDisplayed(): void {
        cy.url().should('include', '/posts');
    }

    verifyLayoutElements(): void {
        cy.contains(this.postsHeader, 'Posts').should('be.visible');
        cy.get(this.createPostButton).should('be.visible');
        cy.get(this.postsLink).should('be.visible');
        cy.get(this.profileLink).should('be.visible');
        cy.get(this.logoutButton).should('be.visible');
    }

    verifyEmptyPostListMessage(): void {
        cy.contains(this.noPostsMessage).should('be.visible');
    }

    enterToCreatePost(): void {
        cy.get(this.createPostButton).click();
    }

    enterToUpdatePost(): void {
        cy.get(this.editPostButton).click();
    }

    verifyPostInList(title: string, content: string): void {
        cy.contains(this.postTitle, title).should('be.visible');
        cy.contains(this.postContent, content).should('be.visible');
    }

    verifyPostCardElements(): void {
        cy.get(this.postCard).first().within(() => {
            cy.get(this.editPostButton).should('be.visible');
            cy.get(this.deletePostButton).should('be.visible');
            cy.contains(/Created on/).should('be.visible');
        });
    }

    navigateToProfile(): void {
        cy.get(this.profileLink).click();
        cy.url().should('include', '/profile');
    }

    navigateToPosts(): void {
        cy.get(this.postsLink).click();
        cy.url().should('include', '/posts');
    }

    deletePost(): void {
        cy.get(this.deletePostButton).click();
        cy.on('window:alert', () => true);
    }

    logout(): void {
        cy.get(this.logoutButton).click();
        cy.url().should('include', '/login');
    }
}
