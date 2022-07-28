describe('Select Language', () => {
  it('Select language', () => {
    cy.visit("/")

    cy.contains("Continue")
      .click()

	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=0')
  })
});

describe('Let’s go!', () => {
 
  it('Let’s go!', () => {

    cy.contains("Let’s go!")
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=1')
    cy.wait(1500)
  })
})

describe('Set database settings', () => {
  it('Input database name', () => {

    cy.get("input#dbname")
	  .clear()
      .type("wordpress")
      .should('have.value', "wordpress")  
  });

  it('Input user name', () => {
    cy.get("input#uname")
	  .clear()
      .type("root")
      .should('have.value', "root")  
  });

  it('Input password', () => {
    cy.get("input#pwd")
	  .clear()
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")  
  });

  it('Input database host', () => {
    cy.get("input#dbhost")
	  .clear()
      .type(Cypress.env("siteIpAddress"))
      .should('have.value', Cypress.env("siteIpAddress"))  
  });
  
  it('Input prefix', () => {
    cy.get("input#prefix")
	  .clear()
      .type("wp_")
      .should('have.value', "wp_")  
  });	
  
  it('Push submit', () => {
    cy.contains("Submit")
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=2')
  })
});


describe('Run the installation', () => {
  it('Run the installation', () => {
	cy.screenshot()
    cy.contains("Run the installation")
      .click()
	cy.url()
	  .should('include', '/wp-admin/install.php?language=en_US')
    cy.wait(1500)
  })
});

describe('Set blog site settings', () => {
  it('Set title', () => {
    cy.get("input#weblog_title")
      .type("Test Blog")
      .should('have.value', "Test Blog")  
  });
  
  it('Set user login name', () => {
    cy.get("input#user_login")
      .type("TestUser")
      .should('have.value', "TestUser")
  });
  
  it('Set user login password', () => {
    cy.get("input#pass1.regular-text.strong")
      .clear()
      .type("C1nder3llaInW0rdpre$$!")
      .should('have.value', "C1nder3llaInW0rdpre$$!")
  });

  it('Set email', () => {
    cy.get("input#admin_email")
      .type("test@example.com")
      .should('have.value', "test@example.com")
  });
  
  it('No public blog', () => {
    cy.get("input#blog_public")
      .click()
  });
  
  it('Click on Install WordPress', () => {
    cy.contains("Install WordPress")
      .click()
  });

  it ('Click on Log In', () => {
    cy.contains("Log In")
      .click()
	cy.url()
	  .should('include', '/wp-login.php')
  })
})
