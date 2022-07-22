describe('Login', () => {
  it('Check Username And Password Without Remember Me', () => {
    cy.visit("/wp-admin")
	cy.wait(1500)

    cy.get("input#user_login.input")
      .type("TestUser")
      .should('have.value', "TestUser")  
    
    cy.get("input#user_pass.input.password-input")
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")  
    
    cy.contains("Log In")
      .click()
	cy.url()
	  .should('include', '/wp-admin')
	cy.contains('Howdy, TestUser')
  })
  
  it('Log Out', () => {
	cy.contains('Howdy, TestUser')
	cy.contains("Log Out")
	  .click({force: true})
	cy.url()
	  .should('not.include', '/wp-admin')
  })

  it('Check if fields are NOT remembered', () => {
    cy.visit("/wp-admin")
	cy.wait(1500)

    cy.get("input#user_login.input")
      .type("TestUser")
      .should('have.value', "TestUser")  
    
    cy.get("input#user_pass.input.password-input")
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")  
    
    cy.contains("Log In")
      .click()
	cy.url()
	  .should('include', '/wp-admin')
	cy.contains('Howdy, TestUser')
  })  

  it('Log Out', () => {
	cy.contains('Howdy, TestUser')
	cy.contains("Log Out")
	  .click({force: true})
	cy.url()
	  .should('not.include', '/wp-admin')
  })

  it('Check checkbox Remember Me', () => {
    cy.visit("/wp-admin")
	cy.wait(1500)

    cy.get("input#user_login.input")
      .type("TestUser")
      .should('have.value', "TestUser")  
    
    cy.get("input#user_pass.input.password-input")
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")  

	cy.contains("Remember Me")
    cy.get("input#rememberme")
	  .click()
    
    cy.contains("Log In")
      .click()
	cy.url()
	  .should('include', '/wp-admin')
	cy.contains('Howdy, TestUser')
  }),
  
  it('Log Out', () => {
	cy.contains('Howdy, TestUser')
	cy.contains("Log Out")
	  .click({force: true})
	cy.url()
	  .should('not.include', '/wp-admin')
  }),

  it('Link Go to Test Blog', () => {
    cy.visit("/wp-admin")
	cy.wait(1500)

	cy.contains("Go to Test Blog")
	  .click()
	cy.url()
	  .should('not.include', '/wp-admin')
  })
})
