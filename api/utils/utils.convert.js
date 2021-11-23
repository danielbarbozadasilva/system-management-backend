const UtilConvertObjectToArray = (arr) => {
  return arr.map(function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  });
};

module.exports = {
  UtilConvertObjectToArray,
};
