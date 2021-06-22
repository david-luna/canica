# Terms & Definitions

The goal is to have straight definitions to conform an ubiquitous language


## Teacher

A teacher is the person who uses the app to keep track of the performance of `Students`. Each teacher is responsible of giving `Grades` of one or more `Subjects` of a certain `SchoolClass` during a `SchoolYear`.

To do so the `Teacher` will keep track of the `Students` of a certain `SchoolClass`, `Subject` and `SchoolYear` in a `Spreadsheet`.

It has the following properties:

- id: string => identifier of the teacher
- name: string => name of the teacher


## Student

A `Student` is the person who is under supervision of several `Teachers` who will assign his `Grades`.

It has the following properties:

- id: string => identifier which is the text in his ID card
- name: string => name of the student

And we can do the following assertions:

- A student belongs to one or many classes


## School Year

A `SchoolYear` is the period when the classes are performed.

It has the following properties:

- id: string => identifier which is the combination of the two last digits of start year and end year
- start: number => the year of the start date of the period
- end: number =>  the year of the end date of the period

And we can do the following assertions:

- A school year has one or many classes
- There is no school year with the same start and end
- All school years have the end property greater than start by one


## School Class <Aggregate>

A `SchoolClass` is a group of `Students`.

It has the following properties:

- id: number => unique identifier of the class
- age: number => age (average/median) of the students of the class
- label: string => the group label of the class
- year: SchoolYear => the year this class belongs to

And we can do the following assertions:

- A school class has one or many students
- A school class belongs to one year


## Subject

A `Subject` is what the teacher teaches to one or many `SchoolClass`

It has the following properties:

- id: number => unique id of the subject
- name: string => the name of the subject

And we can do the following assertions:

- A subject can be taught in one or more classes


## Grade

A `Grade` is the final qualification the `Teacher` gives to a `Student` for a given `Subject`. This is not an entity but rather a value of the association between `Student` and subject. The type of the value may vary depending on the context so it should be a text.


# Domain preview

![Canica - School Domain](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/david-luna/canica/master/docs/diagrams/school-domain.puml)




# TO REVIEW (this are technology concepts and not domain)
## Spreadsheet

A `Spreadsheet` is an entity which contains the `Grades` of

- a given `SchoolClass`
- for a given `SchoolYear`
- and a given `Subject`

This entity is materialized in a spreadsheet file inside google drive which has its own API to access it's data (more detail on implementation file).


## Folder

A `Folder` is an entity which may contain `Spreadsheets` of a given `SchoolYear`.

This entity is materialized in a folder inside google drive which has its own API to access it's data (more detail on implementation file).

## Drive

A `Drive` is where do we place all `Folders` and `SpreadSheets`.

This entity is materialized in a connection to Google's drive API (more detail on implementation file).
