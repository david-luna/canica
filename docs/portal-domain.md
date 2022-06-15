# Terms & Definitions

The goal is to have straight definitions to conform an ubiquitous language

## Student

A `Student` is the person who belogns to a `Group`

It has the following properties:

- id: string => identifier which is may be the text in his ID card
- name: string => name of the student

And we can do the following assertions:

- A student belongs to one or many `Groups`


## StudentGroup <Aggregate>

A `StudentGroup` is a group of `Students`.

It has the following properties:

- id: number => unique identifier of the class
- label: string => the group label of the class
- students: Collection<`Students`> => the students belonging to that `StudentGroup`

And we can do the following assertions:

- A `StudentGroup` has one or many students
- A `StudentGroup` belongs to one year
- A `StudentGroup` belongs to one area

## Quarter

Each year has three `Quarters`. In each of them the teacher gives `Grades` to
his/her `Students`


## Grade

A `Grade` is a value the teacher gives to a `Student` of a `Group` ona given `Quarter`.
This process is reapeated for each `Quarter` of the year.

It has the following properties:

- id: number => unique id of the grade
- code: code => code of the area/diemsion
- value: string => value of the grade

### Domain preview

![Canica - ortal Domain](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/david-luna/canica/master/docs/diagrams/portal-domain.puml)
