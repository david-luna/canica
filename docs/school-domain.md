# Terms & Definitions

The goal is to have straight definitions to conform an ubiquitous language

## Student

A `Student` is the person who is going to get `Grades`. `Students` are organised in 
`StudentGroups`.

It has the following properties:

- id: string => identifier which is may be the text in his ID card
- name: string => name of the student

And we can do the following assertions:

- A student belongs to one or many `StudentGroups`

## Student Group

A `StudentGroup` is a group of `Students` that are located in the same room during a 
`SchoolYear`.

It has the following properties:

- id: number => unique identifier of the group
- name: string => the group name
- year: `SchoolYear` => the year the group was created
- students: Collection<`Students`> => the students belonging to that `SutdentGroup`

And we can do the following assertions:

- A `StudentGroup` is unique over a `SchoolTerm`


## School Term

A `SchoolTerm` is the period when the `Evaluations` are performed.

It has the following properties:

- id: string => identifier which is calculated from start and finish props
- start: Date => start date of the term. Set to September 1st of the starting year
- finish: Date =>  finsih date of the term. Set to June 31th of the finish year (the next)

And we can do the following assertions:

- There is no `SchoolTerm` with the same start and finish
- All `SchoolTerm` have the finish in the next year than start
- A `SchoolTerm` is consecutive of another if the former's start is in the same year than the later's end

## Quarter

Each term has three `Quarters`. In each of them the teacher gives `Grades` to
his/her `Students` as part of the `Evaluation` of the `StudentsGroup`.

It has the following properties:

- id: string => identifier which is calculated from number and `SchoolTerm`
- number: number => number of the quarter [1,2,3]
- term: `SchoolTerm` => term which it belongs to.
And we can do the following assertions:

- A `Quarters` can only have the number 1, 2 or 3
- A `SchoolTerm` has three `Quarters` with different numbers
- An `Evaluation` belongs to a `Quarter`

## Evalutation <Aggregate>

An evaluation is the list of `Grades` for everyone in a `StudentGroup` an a given `Area`
and `Quarter`.

It has the following properties:

- id: number => unique identifier of the class
- label: string => the group label of the class
- quarter: `Quarter` => the year this class belongs to
- area: `Area` => the area of this class
- group: `StudentsGroup` => the students of the class

And we can do the following assertions:

- An `Evalutation` has one `StudentsGroup`
- An `Evalutation` belongs to one `Quarter`
- An `Evalutation` belongs to one `Area`
- There must not be two `Evaluation` for the same `StudentGroup`, `Quarter` & `Area`
- Each `Grade` in evaluation must belong only to a `Student` and a `Dimension` of the `Area`


## Area

A `Area` is what the teacher teaches to one or many `StudentsGroup` (math, history, science).
On a given area the teacher has to evaluate on several `Dimensions` for example in maths
domensions are: calculus, problem solving, etc.

It has the following properties:

- id: number => unique id of the area
- name: string => the name of the area

And we can do the following assertions:

- An Area can be graded in one or many `Evaluations`
- An `Area` has one or many `Dimensions`

## Dimension

A `Dimension` is one of the parts of the `Area` the `Student` gets an `Grade`. Teachers has to evalueate all of them for each `Student`. For each `Area` there is a `Dimension` which is the main one and will keep the overall
`Grade` of the `Area`

It has the following properties:

- id: number => unique id of the dimension
- name: string => the name of the dimension

And we can do the following assertions:

- A `Dimension` belongs to an `Area`
- Each `Student` gets a `Grade` per `Dimension`

## Grade

A `Grade` is a value the teacher gives to a `Student` on a given `Area` or `Dimension`.
This process is reapeated for each `Quarter` of the `SchoolTerm`.

It has the following properties:

- id: number => unique id of the grade
- value: string => value of the grade

### Domain preview

![Canica - School Domain](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/david-luna/canica/master/docs/diagrams/school-domain.puml)
