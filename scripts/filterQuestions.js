const fs = require("fs")
const { CONDITIONS, filter, and, or } = require("../src/utils/filter")
const data = require("../data.json")

const edible = (bool) => filter(CONDITIONS.EQUAL, "edible", bool)
const name = (str) => filter(CONDITIONS.INCLUDES, "name", str)

const questions = data.filter(
  or(
    and(name("Kantarell"), edible(true)),
    name("Röd flugsvamp"),
    name("Svart trumpetsvamp"),
    name("Stolt fjällskivling"),
    name("Gulkremla"),
    and(name("Taggsvamp"), edible(true)),
  ),
)

console.log("Matching questions: ", questions.length)

fs.writeFileSync("questions.json", JSON.stringify(questions, null, 2))
