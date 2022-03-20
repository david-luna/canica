# Terms & Definitions

The goal is to have straight definitions to conform an ubiquitous language

## Student

A `Student` is the person who is going to get `Grades` for different `Areas` & `Dimensions`.

It has the following properties:

- id: string => identifier which is may be the text in his ID card
- name: string => name of the student

And we can do the following assertions:

- A student belongs to one or many `SchoolClass`

## School Year

A `SchoolYear` is the period when the classes are performed.

It has the following properties:

- id: string => identifier which is the combination of the two last digits of start year and end year
- startYear: number => the year of the start date of the period
- finishYear: number =>  the year of the end date of the period

And we can do the following assertions:

- A `SchoolYear` has one or many classes
- There is no `SchoolYear` with the same start and end
- All `SchoolYear` have the end property greater than start by one

## Quarter

Each `SchoolYear` has three `Quarter`. In each of them the teacher gives `Grades` to
his/her `Students`

## School Class <Aggregate>

A `SchoolClass` is a group of `Students` for a given `Area`.

It has the following properties:

- id: number => unique identifier of the class
- label: string => the group label of the class
- year: `SchoolYear` => the year this class belongs to
- area: `Area` => the area of this class
- students: Collection<`Students`> => the students belonging to that `SchoolClass`

And we can do the following assertions:

- A `SchoolClass` has one or many students
- A `SchoolClass` belongs to one year
- A `SchoolClass` belongs to one area

## Area

A `Area` is what the teacher teaches to one or many `SchoolClass` (math, hisstory, science).
On a given area the teacher has to evaluate on several `Dimensions` for example in maths
domensions are: calculus, problem solving, etc.

It has the following properties:

- id: number => unique id of the area
- name: string => the name of the area

And we can do the following assertions:

- An Area can be taught in one or many `SchoolClass`
- An `Area` has one or many `Dimensions`
- Each `Student` gets a grade per `Area`

## Dimension

A `Dimension` is one of the parts of the `Area` the `Student` gets an evaluation. Teachers has to evalueate all of them for each `Student`

It has the following properties:

- id: number => unique id of the dimension
- name: string => the name of the dimension

And we can do the following assertions:

- An `Dimension` belongs to an `Area`
- Each `Student` gets a grade per `Dimension`

## Grade

A `Grade` is a value the teacher gives to a `Student` on a given `Area` or `Dimension`.
This process is reapeated for each `Quarter` of the `SchoolYear`.

It has the following properties:

- id: number => unique id of the grade
- value: string => value of the grade

### Domain preview

![Canica - School Domain](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/david-luna/canica/master/docs/diagrams/school-domain.puml)
