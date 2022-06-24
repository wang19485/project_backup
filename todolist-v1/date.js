exports.getTodayDate = function(){
  const today = new Date();
  const option = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  return today.toLocaleDateString("en-US", option);
}

exports.getTodayDay = function(){
  const today = new Date();
  const option = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", option);
}
