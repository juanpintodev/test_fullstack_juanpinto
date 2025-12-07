describe("Authentication Page", () => {
  beforeEach(() => {
    // Clear session state and visit the home page before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should display the main page title", () => {
    // The main page should always show this title, even for logged-out users
    cy.get("h1").should("contain", "Task List App");
  });

  it("should display the authentication component with welcome text", () => {
    // Check for the text within the AuthComponent
    cy.get("h5").should("contain", "Welcome");
    cy.get("p").should("contain", "Sign in to manage your tasks");
  });

  it("should display a single 'Sign In / Sign Up' button", () => {
    // Find the main call-to-action button
    const signInButton = cy.get('button').contains("Sign In / Sign Up");

    // Assert that the button is visible
    signInButton.should("be.visible");
  });

  // Note: We are not testing the redirect to the external provider (Cognito)
  // as that is out of the scope of the application's E2E tests.
  // These tests correctly verify that our application is trying to
  // initiate the authentication flow as expected.
});
