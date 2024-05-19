describe("unregister user", () => {
  beforeEach(() => {
    cy.window().its("localStorage").should("not.have.property", "name");
    cy.window().its("localStorage").should("not.have.property", "accessToken");
  });

  it("redirects user to login page if not logged in", () => {
    cy.visit("/profile.html?name=frostfeather");
    cy.url().should("include", "/login.html");
  });

  it("can search through listings based on title and description", () => {
    cy.visit("/");
    cy.intercept(
      "https://v2.api.noroff.dev/auction/listings/search?q=test&_bids=true",
    ).as("searchRequest");
    cy.get("select[name=search]").select("Listing");
    cy.get("input[type=search]").type("test{enter}");
    cy.wait("@searchRequest");
    cy.url().should("include", "/search.html");
    cy.get("h1").should("contain", "test");
  });

  it("can not search through profiles", () => {
    cy.visit("/");
    cy.get("select[name=search]").select("Profile");
    cy.get("input[type=search]").type("test{enter}");
    cy.contains("Error").should("be.visible");
  });
  it("can search through listings based on tag", () => {
    cy.visit("/");
    cy.intercept(
      "https://v2.api.noroff.dev/auction/listings?_tag=test&_bids=true&_active=true",
    ).as("searchRequest");
    cy.get("select[name=search]").select("Tag");
    cy.get("input[type=search]").type("test{enter}");
    cy.wait("@searchRequest");
    cy.get("h1").should("contain", "Tag");
  });

  it("cannot bid on auction", () => {
    cy.visit("/");
    cy.intercept("https://v2.api.noroff.dev/auction/**").as("allRequests");
    cy.wait("@allRequests");
    cy.get("a.card").first().click();
    cy.contains("button", "Bid").should("not.exist");
  });
});

describe("registered user", () => {
  beforeEach(() => {
    cy.intercept("https://v2.api.noroff.dev/auth/login").as("loginData");
    cy.visit("/login.html");
    cy.get("input#floating-email").type("frostfeather@stud.noroff.no");
    cy.get("input#floating-password").type("c2eCe2eF2r2£@dwsA{enter}");
    cy.wait("@loginData");
  });
  it("can view their total credit", () => {
    cy.intercept("https://v2.api.noroff.dev/auction/profiles/**").as(
      "profileRequests",
    );
    cy.visit("/profile.html?name=frostfeather");
    cy.wait("@profileRequests");
    cy.get(".bid-xs").each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          const number = parseFloat(text);
          expect(number).to.be.at.least(0);
        });
    });
  });
  /*
  it("can update profile", () => {
    if (Cypress.env("SKIP_TESTS")) {
      return;
    }
    cy.intercept("https://v2.api.noroff.dev/auction/profiles/**").as(
      "profileRequests",
    );
    cy.visit("/edit_profile.html?name=frostfeather");
    cy.wait("@profileRequests");
    cy.contains("Continue").click();
    cy.get("input#floating-avatar_url").then(($input) => {
      $input[0].value =
        "https://images.unsplash.com/photo-1715412406617-e76cd73e644d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    });
    cy.contains("Continue").click();
    cy.contains("Update").click();
    cy.wait("@profileRequests");
    cy.get("#profile-info img").should(
      "have.attr",
      "src",
      "https://images.unsplash.com/photo-1715412406617-e76cd73e644d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
    cy.visit("/edit_profile.html?name=frostfeather");
    cy.wait("@profileRequests");
    cy.contains("Continue").click();
    cy.get("input#floating-avatar_url").then(($input) => {
      $input[0].value =
        "https://images.unsplash.com/photo-1709136331807-45ce0c8536a0?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    });
    cy.contains("Continue").click();
    cy.contains("Update").click();
    cy.wait("@profileRequests");
    cy.get("#profile-info img").should(
      "have.attr",
      "src",
      "https://images.unsplash.com/photo-1709136331807-45ce0c8536a0?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  });
  */
});
