describe("register", () => {
  beforeEach(() => {
    cy.visit("/register.html");
  });
  it("cannot register an already registered user", () => {
    cy.intercept("https://v2.api.noroff.dev/auth/register").as("registerData");
    cy.get("button#prev-btn").should("not.be.visible");
    cy.get("input#floating-name").type("test");
    cy.get("input#floating-email").type("test@stud.noroff.no");
    cy.get("input#floating-password").type("password");
    cy.get("input#floating-password_repeat").type("password");
    cy.contains("Continue").click();
    cy.get("button#prev-btn").should("be.visible");
    cy.contains("Continue").click();
    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.wait("@registerData");
    cy.contains("Profile already exists").should("be.visible");
  });
});
