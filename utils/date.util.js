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

const dateToChineseCharacterFormat = (date) => {
  let d = date.split('-');
  return d[0] + "年" + d[1] + "月" + d[2] + "日";
};

const dateToDotFormat = (date) => {
  let d = date.split('-');
  return d[1] + '.' + d[2] + '.' + d[0];
}

module.exports = {
  getNowDate: getNowDate,
  dateToChineseCharacterFormat: dateToChineseCharacterFormat,
  dateToDotFormat: dateToDotFormat
};
