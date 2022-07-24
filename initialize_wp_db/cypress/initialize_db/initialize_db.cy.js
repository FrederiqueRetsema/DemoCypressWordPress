describe('Initialize DB', () => {
  it('Select language', () => {
    cy.visit("/")

    cy.contains("Continue")
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=0')
  }),
  it('Let’s go!', () => {

    cy.contains("Let’s go!")
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=1')
  }),  
  it('Set database settings', () => {
    cy.wait(1500)
    cy.get("input#dbname")
	  .clear()
      .type("wordpress")
      .should('have.value', "wordpress")  
    cy.get("input#uname")
	  .clear()
      .type("root")
      .should('have.value', "root")  
    cy.get("input#pwd")
	  .clear()
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")  
    cy.get("input#dbhost")
	  .clear()
      .type("192.168.2.78")
      .should('have.value', "192.168.2.78")  
    cy.get("input#prefix")
	  .clear()
      .type("wp_")
      .should('have.value', "wp_")  
	
    cy.contains("Submit")
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=2')
  }),  
  it('Run the installation', () => {
	cy.screenshot()
    cy.contains("Run the installation")
      .click()
	cy.url()
	  .should('include', '/wp-admin/install.php?language=en_US')
  }),  
  it('Set blog site settings', () => {
    cy.wait(1500)
    cy.get("input#weblog_title")
      .type("Test Blog")
      .should('have.value', "Test Blog")  
    cy.get("input#user_login")
      .type("TestUser")
      .should('have.value', "TestUser")
    cy.get("input#pass1.regular-text.strong")
      .clear()
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")
    cy.get("input#admin_email")
      .type("test@example.com")
      .should('have.value', "test@example.com")
    cy.get("input#blog_public")
      .click()
    cy.contains("Install WordPress")
      .click()

    cy.contains("Log In")
      .click()
	cy.url()
	  .should('include', '/wp-login.php')
  })
})