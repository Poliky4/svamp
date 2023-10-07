const CONDITIONS = {
  EQUAL: "EQUAL",
  NOT_EQUAL: "NOT_EQUAL",
  INCLUDES: "INCLUDES",
  LESS_THAN: "LESS_THAN",
  MORE_THAN: "MORE_THAN",
  ENUM: "ENUM",
}

function filter(operator, property, value) {
  switch (operator) {
    case CONDITIONS.EQUAL: {
      return function filterEqual(object) {
        return object?.[property] === value
      }
    }
    case CONDITIONS.NOT_EQUAL: {
      return function filterNotEqual(object) {
        return object[property] !== value
      }
    }
    case CONDITIONS.INCLUDES: {
      const regex = new RegExp(value, "gi")
      return function filterIncludes(object) {
        return object?.[property] && regex.test(object[property])
      }
    }
    case CONDITIONS.LESS_THAN: {
      return function filterLessThan(object) {
        return object?.[property] && object[property] < value
      }
    }
    case CONDITIONS.MORE_THAN: {
      return function filterMoreThan(object) {
        return object?.[property] && object[property] > value
      }
    }
    case CONDITIONS.ENUM: {
      return function filterMoreThan(object) {
        return object?.[property] && value.includes(object[property])
      }
    }
    default: {
      throw new Error(`Unknown filter`, operator)
    }
  }
}

function and(...filters) {
  return (query) => filters.every((filter) => filter(query))
}
function or(...filters) {
  if (!filters.length) return () => true
  return (query) => filters.some((filter) => filter(query))
}

module.exports = {
  CONDITIONS,
  filter,
  and,
  or,
}
