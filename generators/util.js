function classToFilename(value) {
  return value.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = {
  classToFilename: classToFilename
}
