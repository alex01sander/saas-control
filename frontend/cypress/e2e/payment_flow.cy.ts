describe("Payment Flow - Success Page", () => {
  beforeEach(() => {
    // We mock the initial state as PENDING to trigger the polling
    cy.intercept("GET", "**/me", {
      statusCode: 200,
      body: {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
        role: "CLIENT",
        subscriptionStatus: "PENDING",
      },
    }).as("getUser");

    // Mock login/token to bypass AuthContext guard if necessary
    localStorage.setItem("@SaaSControl:token", "fake-token");
  });

  it("should reproduce the infinite request loop on the success page", () => {
    cy.visit("/success");

    // Wait for initial calls
    cy.wait("@getUser");
    
    // In the current buggy implementation, every time refreshUser is called,
    // the useEffect in SuccessPage re-runs, resetting everything and calling refreshUser again.
    
    // We'll wait 5 seconds and check how many times @getUser was called.
    // In a normal polling every 2s, it should be around 3-4 times.
    // In an infinite loop, it might be dozens or hundreds.
    
    cy.wait(5000).then(() => {
      cy.get("@getUser.all").then((interceptions) => {
        const callCount = interceptions.length;
        cy.log(`Call count after 5 seconds: ${callCount}`);
        
        // If it's an infinite loop, this will be very high.
        // Even if it's not "infinite" in speed, it will definitely exceed the expected poll rate.
        expect(callCount).to.be.greaterThan(5); 
      });
    });
  });
});
