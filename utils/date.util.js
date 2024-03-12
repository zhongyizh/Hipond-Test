const getNowDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return [year, month, day]
    .map((n) => {
      n = n.toString();
      return n[1] ? n : `0${n}`;
    })
    .join('-');
};
module.exports = {
  getNowDate: getNowDate
};
