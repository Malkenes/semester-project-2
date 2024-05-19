describe("auction", () => {
  beforeEach(() => {
    cy.intercept("https://v2.api.noroff.dev/auth/login").as("loginData");
    cy.visit("/login.html");
    cy.get("input#floating-email").type("frostfeather@stud.noroff.no");
    cy.get("input#floating-password").type("c2eCe2eF2r2£@dwsA{enter}");
    cy.wait("@loginData");
  });
  it("can create an auction", () => {
    cy.visit("create_listing.html");
    cy.get("input#floating-title").type("Mercedes Benz Automobile");
    cy.get("textarea#description").type(
      "Used car that goes wroom wroom on the road, perfect for new and old drivers who want to contribute to destruction of the ozone layer",
    );
    cy.contains("Continue").click();
    cy.get("input#floating-media_url").then(($input) => {
      $input[0].value =
        "https://images.unsplash.com/photo-1715756613500-449d2edefab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    });
    cy.get("input#floating-media_alt").type(
      "A car is parked on the side of the road",
    );
    cy.contains("button", "Add media").click();
    cy.wait(1000);
    cy.get("input#floating-media_url").then(($input) => {
      $input[0].value =
        "https://images.unsplash.com/photo-1715756612381-7bf1c7512b9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    });
    cy.get("input#floating-media_alt").type(
      "A car with the sun shining through the window",
    );
    cy.contains("button", "Add media").click();

    cy.contains("Continue").click();
    cy.get("input#tag-input").type("car");
    cy.contains("button", "Add tag").click();
    cy.get("input#tag-input").type("mercedez");
    cy.contains("button", "Add tag").click();
    cy.get("input#tag-input").type("vehicle");
    cy.contains("button", "Add tag").click();
    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.get("h1").should("contain", "Mercedes Benz Automobile");
  });
  it("can edit an auction", () => {
    cy.visit("create_listing.html");
    cy.get("input#floating-title").type("Test");
    cy.contains("Continue").click();
    cy.contains("Continue").click();
    cy.get("input#tag-input").type("deletetag");
    cy.contains("button", "Add tag").click();
    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.get("h1").should("contain", "Test");
    cy.get(".tag").should("exist");

    cy.contains("edit").click();
    cy.get("input#floating-title").type("Edited");
    cy.contains("Continue").click();
    cy.contains("Continue").click();
    cy.contains("deletetag").click();
    cy.contains("Update").click();
    cy.wait(10000);
    cy.get("h1").should("contain", "TestEdited");
    cy.get(".tag").should("not.exist");
  });
  it("can delete an auction", () => {
    cy.intercept("https://v2.api.noroff.dev/auction/listings/**").as(
      "allRequests",
    );

    cy.visit("create_listing.html");
    cy.get("input#floating-title").type("delete test");
    cy.contains("Continue").click();
    cy.contains("Continue").click();
    cy.contains("Continue").click();
    cy.contains("Submit").click();

    cy.contains("button", "delete").click();
    cy.wait("@allRequests");
    cy.url().should("include", "/");
  });
});

describe("bidding", () => {
  beforeEach(() => {
    cy.intercept("https://v2.api.noroff.dev/auth/login").as("loginData");
    cy.intercept("https://v2.api.noroff.dev/auction/**").as("allRequests");
    cy.visit("/login.html");
    cy.get("input#floating-email").type("frostfeather@stud.noroff.no");
    cy.get("input#floating-password").type("c2eCe2eF2r2£@dwsA{enter}");
    cy.wait("@loginData");
    cy.wait("@allRequests");
  });
  it("can view bids", () => {
    cy.get("a.card").first().click();
    cy.get(".bid").eq(0).should("be.visible");
    cy.get(".bid").eq(1).should("not.be.visible", { timeout: 10000 });
    cy.contains("View all bids").click();
    cy.get(".bid").should("be.visible");
  });
  it("can add a bid to another users listing", () => {
    cy.get("a.card").eq(3).click();
    cy.get("input#input-bid")
      .invoke("val")
      .then((value) => {
        cy.contains("button", "Bid").click();
        cy.wait(1000);
        cy.get(".bid")
          .eq(0)
          .invoke("text")
          .then((bidValue) => {
            expect(bidValue.trim()).to.equal(value.trim());
          });
      });
  });
});
