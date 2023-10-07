const fs = require("fs")
const path = require("path")
const { v4: uuid } = require("uuid")
const { links } = require("./links")

const tableRegex = /(^<table[.\s\S]+?\/table>$)/m
const characteristicsTableReg = /Den mykologiska karaktären hos/
const cellDataReg = /^<small>([.\s\S]*?)<\/small>$/gm
const linkNameReg = /^.+\/(.+)/
const scientificNameReg = /Vetenskapligt namn[.\s\S]*?<i>(.+?)<\/i>/i

const characteristicsKeyMappings = [
  { key: "edible", regex: /ätlighet/i, transform: transformEdible },
  { key: "cap", regex: /hatt/i },
  { key: "ridges", regex: /skivtyp/i },
  { key: "hymenium", regex: /hymenium/i },
  { key: "stipe", regex: /fot/i },
  { key: "sporePrint", regex: /sporavtryck/i },
  { key: "active", regex: /psykoaktiv/i, transform: Boolean },
]

function transformEdible(edibleString) {
  const edibleStrings = ["ätlig", "delikat", "god"]
  return edibleStrings.includes(edibleString)
}

;(async () => {
  const linkContents = await Promise.all(
    links.map(async (link) => {
      const content = await getLinkContent(link)
      return { link, content }
    }),
  )

  const data = []
  const skipped = []

  for (const { link, content } of linkContents) {
    const name = decodeURIComponent(linkNameReg.exec(link)?.[1]).replace(
      "_",
      " ",
    )
    const scientificName = scientificNameReg
      .exec(content)?.[1]
      .replace(/<[\s\S]*?>/g, "")
    const family = scientificName?.split(" ")[0] ?? null

    const tables = tableRegex.exec(content)
    const characteristicsTable = tables?.find((table) =>
      characteristicsTableReg.test(table),
    )
    if (characteristicsTable) {
      const cellDataMatches = [...characteristicsTable.matchAll(cellDataReg)]
      const characteristics = characteristicsKeyMappings.reduce(
        (characteristics, mapping) => {
          let value = null
          cellDataMatches.forEach((cell) => {
            const val = cell[1]
              .split("<br />")
              .map((string) => string.trim())[1]
            if (mapping.regex.test(cell[0])) {
              value = val
            }
          })

          characteristics[mapping.key] = mapping.transform
            ? mapping.transform(value)
            : value ?? null
          return characteristics
        },
        {},
      )

      data.push({
        id: uuid(),
        link,
        name,
        scientificName,
        family,
        ...characteristics,
      })
    } else {
      skipped.push({
        link,
        name,
      })
      // console.log("Characteristics table not found for", link);
      continue
    }
  }

  console.log("data: ", data.length)
  console.log("skipped: ", skipped.length)

  const filePath = path.resolve(__dirname, "result.json")
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
})()

async function getLinkContent(link = "") {
  const matches = linkNameReg.exec(link)
  const name = decodeURIComponent(matches?.[1])

  const filePath = path.resolve(__dirname, "data", name)
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath).toString()
  }

  try {
    const res = await fetch(link)
    const html = await res.text()
    fs.writeFileSync(filePath, html)
    return html
  } catch (e) {
    throw new Error("Failed fetching link")
  }
}
