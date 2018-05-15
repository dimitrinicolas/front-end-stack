module.exports = function(a) {
  console.log("filternbij", a);
  return /\.css$/gi.test(a);
};
