# DemoCypressWordPress

Demo Cypress tests with WordPress

# Start of the demo
I'm using a Windows 11 Enterprise laptop with Windows Sandbox for this demo. In this document the laptop is called "host", the sanbox is called "sandbox". You can install Windows Sandbox by searching for "Turn on Windows Features" and then switch on Windows Sandbox on your laptop. Windows Sandbox also uses Hyper-V. Using Windows Sandbox requires a reboot.

## Configure sandbox
Change the DemoCypressSandbox.wsb file in this repo to connect the directory where you cloned this repo from to C:\Demo. Start the sanbox by double clicking on this file. Within the sandbox, open a privileged Powershell window and execute the following commands:

Install Chocolatey (see: https://chocolatey.org/install)

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Take care of the questions that you have to answer during the installation of the software
```
choco feature enable -n allowGlobalConfirmation
```

Install the software
```
choco install nodejs googlechrome notepadplusplus
```

Open a new CMD window and execute the following commands to install Cypress:
```
cd \demo\initialize_wp_db
npm install cypress
cd \demo\write
npm install cypress
```

## Start wordpress and mysql database
On the host, start wordpress and mysql via Docker in a cmd window:

```
docker run -d -p 80:80 --name wordpress wordpress
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=C1nder3llaInW0rdpre$$! --name mysql mysql
```

Create the wordpress database (<-- enter *C1nder3llaInW0rdpre$$!* as the password):
```
docker exec -it mysql bash
mysql -u root -p                    
CREATE DATABASE wordpress;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'C1nder3llaInW0rdpre$$!';
exit
exit
```

You might have to open the firewall for the ports 80 and 3306: the sandbox is not able to use the local host address for the connection to the host. We need to know what the current IP address is of the host:

```
ipconfig
```

I got very many network addresses. The first part of the output was:
```
C:\Users\Frederique>ipconfig

Windows IP Configuration


Ethernet adapter vEthernet (Default Switch):

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::81a5:3a46:b3a8:7aa9%16
   IPv4 Address. . . . . . . . . . . : 172.25.0.1
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :
```

In the sandbox, open Chrome and go to http://172.25.0.1, you should see the selection screen for languages from WordPress.

In the rest of this document, I'm using 172.25.0.1 (it worked for me, when it doesn't work for you please check the IP address and the firewall and when it still doesn't work try another IP address from the list). 

In the sandbox, change the IP address to your value in the files c:\demo\initialize_wp_db\config.cy.js and c:\demo\write\config.cy.js

## Firewall
You need to open ports 80 and 3306 in the firewall. Please mind that Docker might block all traffic from other network cards.


## Initialize WordPress
In the sandbox, execute the following commands to start Cypress and initialize the database via Cypress:

```
cd \demo\initialize_wp_db
.\node_modules\.bin\cypress open
```
* Click on "Configured" under E2E testing
* Click on Electron and then click on the button "Start E2E testing in Electron"
* Click on the link initialize_wp_db.cy.js and watch how WordPress is initialized automatically ;-)

When everything goes well, you will see a list of green checkboxes in the left menu. Your WordPress database and WordPress container are configured to do the demo. You can stop the Cypress screens. 

# Demo

## Labels (Chrome)
In the demo, use the \demo\write directory as the base to show what is going on:
* Start Chrome
* Start notepad++, open c:\demo\write\
* Show via F12 how you can see what part of the screen has what labels. Look for example at the 

There are best practices for selecting labels for your tests: see https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

You can use the write > cypress > check-dashboard > demo.cy.js to create some tests. You can also show that currently none of these tests run, because of the describe.skip part on top. 

## Testing links
It is possible to click on links, but should you do this? Cypress is very clear about this: when you click on a link, you test the browser, not your website. You can just check if the URL where the link points to is correct. This saves a lot of time, because you don't have to load the page where the link points to. 

## Using variables
It is possible to use variables for, for example, user id's, passwords, site addresses, etc. You can find an example of this in the cypress.config.js file (where the environment variables are set) and the write > cypress > login > login.cy.js file where these variables are used via f.e. Cypress.env('userId'). The base variable is always available via Cypress.config().baseUrl (see f.e. write > cypress > check-dashboard > check-menus.cy.js).

## Login / logout
It is possible to login manually for each test that is behind the login screen, entering a username and password wherever there is asked for. A better solution is to login once and then use the cookies that are created in the following tests as well. This is still expiremental (it will be in the next major release), so you have to add the setting experimentalSessionAndOrigin: true in the cypress.config.js file. You can add the login commands in the support > commands.js file as part of the session command:

```
  cy.session("write", () => {
    cy.visit('/wp-admin')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()
    cy.url().should('contain', '/wp-admin')
  })

```

You can add different sessions with different names if you want to use multiple users (or keep this function and add parameters userId and password). This is not implemented here. 

## Integration between browser and NodeJS
One of the best practices is to do the cleanup and creation of seed data before a test starts, not after the test is completed. The goal is to always know what is in the database. It is impossible to call the database directly from the browser, we need two steps to do this: (1) add cy.task('functionname') in the test and (2) add the function in support > commands.js.

## Video and screenshots
When you use cypress run instead of cypress open then all tests will be run and a video will be created afterwards. WHen there are errors, screenshots will be created as well. You can enforce creating a screenshot on certain points in the tests by using the cy.screenshot() comment. 

# Important

## Goal of this demo
This repo is the base for the demo. It contains a lot of tests, mainly to show how Cypress works. Many tests are just meant to trigger the use of a file on the serverside, not to do intensive testing of the functionality. The reason for this is that these tests will be the base for another example repository about distroless containers (where it is important to "touch" all files that are used, and less if all the functionality works as designed - this should be tested by the software itself).
