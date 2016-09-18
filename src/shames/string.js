
String.prototype.toDash = function() {
  return this.replace(/[A-Z]/g, ($1) => `-${$1.toLowerCase()}`)
}
