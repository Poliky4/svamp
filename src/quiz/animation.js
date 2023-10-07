function animate(animation) {
  return (element, duration) => element.animate(animation, duration)
}

// prettier-ignore
export const wiggle = animate([
  { transform: "skewX(0deg)" }, 
  { transform: "skewX(10deg)" },
  { transform: "skewX(-10deg)" },
  { transform: "skewX(10deg)" },
  { transform: "skewX(0deg)" },
])

// prettier-ignore
export const spin = animate([
  { transform: "rotateY(0deg)" }, 
    { transform: "rotateY(90deg)" },
  { transform: "rotateY(0deg)" },
])

// prettier-ignore
export const exitRight = animate([
  { transform: "translate(0, 0) rotateZ(0deg) rotateY(0deg)"},
  { transform: "translate(100vw, -100vh) rotate(-90deg) rotateY(90deg)" },
])

// prettier-ignore
export const enterLeft = animate([
  { transform: "translate(-100vw, -100vh) rotate(90deg)" },
  { transform: "translate(0, 0) rotate(0deg)"}, 
  
])

// prettier-ignore
export const jump = animate([
  { transform: "scale(1)" },
  { transform: "scale(1.8)" },
  { transform: "scale(1)" }
])
