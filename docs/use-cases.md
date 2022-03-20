# Use Cases

## UC01 - List grade classes

As a teacher I want to see the list of classes I already have to give grades.
These classes should be should be divide in two groups: non uploaded & uploade dclasses.

### DoD UC01

`WHEN` Teacher starts the application
`IF` there is no saved session `THEN` request credentials
`WHEN` teacher is logged in
`THEN` app shows list of classes in two different tabs (current, uploaded)

## UC02 - Download

As a teacher I want to create new classes by area and quarter to fill up for later upload.

### DoD UC02

`GIVEN` I'm logged in
`WHEN` I select to import new classes
`THEN` app requests for credentials to access the portal
`WHEN` I input the credentials
`THEN` app request which grade areas to import showing all options
`WHEN` I pick the areas
`THEN` app request for which quarters I want to import (1st, 2nd or 3rd)
`WHEN` I pick the quarters
`THEN` app extracts from the portal the groups of students
`AND` for each group, area & quarter a new class is created

## UC03 - Upload

As a teacher once finished to fill the grades of one class I want to upload them
to the platform.

### DoD UC03

`GIVEN` I'm logged in
`WHEN` I select some files on the list
`AND` I command to upload them
`THEN` app requests for credentials to access the portal
`WHEN` I input the credentials
`THEN` app uploads the grades for the given list of students in the proper area and quarter

## UC03 - Edit

As a teacher I want to edit an specific class if not uploaded yet.

### DoD UC03

`GIVEN` I'm logged in
`WHEN` I select a class on the current list
`AND` I click on the edit button
`THEN` app opens a window with the class info that allows to edit
