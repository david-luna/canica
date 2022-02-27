# Use Cases

## UC01 - List grade classes

As a teacher I want to see the list of classes I already have to give grades.
These classes should be should be divide in two groups: non uplades & uploade classes.

### DoD UC01

`WHEN` Teacher starts the application
`IF` there is no saved sessin `THEN` request credentials
`WHEN` teacher is logged in
`THEN` app shows list of classes in two different tabs (current, uploaded)

## UC02 - Download

As a teacher I want to create new grade classes to fill up for later upload.

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
### DoD UC02

`GIVEN` I'm logged in
`WHEN` I select some files on the list
`AND` I cammand to upload them
`THEN` app requests for credentials to access the portal
`WHEN` I input the credentials
`THEN` app uploads the grades for the given list of students in the proper area and quarter
