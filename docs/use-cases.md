# Use Cases

## UC01 - Settings

As a user I want to setup the application to login to Google and also the platform. This information will be requested by the application when needed.

### DoD UC01

There are some situations where this use case applies. Those are

#### Application 1st run

`GIVEN` a new installation of the app
`WHEN` I open it
`THEN` I see a form asking me for the configuration
`WHEN` I fill the information
`THEN` the application will check if configuration is right

#### Credentials expired

`GIVEN` an application already configured
`WHEN` there is an authentication problem
`THEN` I see a message of outdated config
`WHEN` I opt in to fix it
`THEN` the application will show the configuration form

## UC02 - Import

As a user I want to import class data for a given set of grades.

### DoD UC02

`GIVEN` an application with the rigth configuration
`WHEN` I opt in to import classes
`THEN` I see a selector of the grades
`WHEN` I pick the grades to import
`THEN` the application will generate the data for grades and classes
