describe("login", () => {
  beforeEach(() => {
    cy.visit("/login.html");
  });
  it("can login with valid credentials", () => {
    cy.get("input#floating-email").type("frostfeather@stud.noroff.no");
    cy.get("input#floating-password").type("c2eCe2eF2r2£@dwsA{enter}");
    cy.url().should("include", "/");
    cy.window().its("localStorage").should("have.property", "name");
    cy.window().its("localStorage").should("have.property", "accessToken");
  });
  it("cannot login with invalid crendtials and is shown a message", () => {
    cy.intercept("https://v2.api.noroff.dev/auth/login").as("loginData");
    cy.get("input#floating-email").type("test@stud.noroff.no");
    cy.get("input#floating-password").type("password{enter}");
    cy.wait("@loginData");
    cy.url().should("include", "/login.html");
    cy.get("#auth-error").should("be.visible");
  });
  it("can logout with the logout button", () => {
    cy.get("input#floating-email").type("frostfeather@stud.noroff.no");
    cy.get("input#floating-password").type("c2eCe2eF2r2£@dwsA{enter}");
    cy.contains("logout").click();
    cy.window().its("localStorage").should("not.have.property", "name");
    cy.window().its("localStorage").should("not.have.property", "accessToken");
  });
});
