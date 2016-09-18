
String.prototype.toDash = function() {
  return this.replace(/[A-Z]/g, ($1) => `-${$1.toLowerCase()}`)
}

String.prototype.toTitleCase = function() {
  const result = this.replace(/([A-Z])/g, " $1")
  return `${result.charAt(0).toUpperCase()}${result.slice(1)}`
}
