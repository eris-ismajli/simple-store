export function getRatingColor(rating) {
  let color = ""

  if (rating <= 1.5 && rating > 0) {
    color = "red"
  } else if (rating <= 3.5) {
    color = "orange"
  } else if (rating <= 5) {
    color = "green"
  } else {
    color = "gray"
  }

  return color
}