describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display authentication form", () => {
    cy.get("h1").should("contain", "Task List App");
    cy.get("h6").should("contain", "Sign in to manage your tasks");

    // Check for tabs
    cy.get('[role="tab"]').should("have.length", 2);
    cy.get('[role="tab"]').first().should("contain", "Sign In");
    cy.get('[role="tab"]').last().should("contain", "Sign Up");
  });

  it("should switch between sign in and sign up tabs", () => {
    // Initially on sign in tab
    cy.get('[role="tabpanel"]').should("contain", "Sign In");

    // Switch to sign up tab
    cy.get('[role="tab"]').last().click();
    cy.get('[role="tabpanel"]').should("contain", "Create Account");

    // Switch back to sign in tab
    cy.get('[role="tab"]').first().click();
    cy.get('[role="tabpanel"]').should("contain", "Sign In");
  });

  it("should show validation errors for empty fields", () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check for required field validation
    cy.get('input[type="email"]').should("have.attr", "required");
    cy.get('input[type="password"]').should("have.attr", "required");
  });

  it("should show error for password mismatch in sign up", () => {
    // Switch to sign up tab
    cy.get('[role="tab"]').last().click();

    // Fill form with mismatched passwords
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').first().type("password123");
    cy.get('input[type="password"]').last().type("password456");

    cy.get('button[type="submit"]').click();

    // Should show password mismatch error
    cy.get('[role="alert"]').should("contain", "Passwords do not match");
  });

  it("should handle invalid credentials gracefully", () => {
    // Try to sign in with invalid credentials
    cy.get('input[type="email"]').type("invalid@example.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.get('[role="alert"]').should("be.visible");
  });

  it("should have proper form accessibility", () => {
    // Check for proper labels
    cy.get('input[type="email"]').should("have.attr", "aria-label");
    cy.get('input[type="password"]').should("have.attr", "aria-label");

    // Check for proper button types
    cy.get('button[type="submit"]').should("exist");

    // Check for proper form structure
    cy.get("form").should("exist");
  });
});
