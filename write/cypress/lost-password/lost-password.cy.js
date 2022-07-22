describe('Lost password', () => {
  beforeEach(() => {
    cy.visit("/wp-login.php?action=lostpassword")
	cy.wait(100)
  }	  )

  it("Push button New Password", () => {

	cy.get("input#user_login.input")
	  .type("TestUser")

	cy.contains("Get New Password")
	  .click()
	  
	cy.contains("The email could not be sent")
  }),
  it("Check Go to Test Blog", () => {
  	cy.contains("Go to Test Blog")
	  .click()
	  .url()
      .should('equal', 'http://192.168.2.78/') 
  })
})
