export const getTimestampConversion = function (timestamp) {
  let timeStamp;
  let timeStampLen = timestamp.toString().length;
  if (timeStampLen === 10) {
    timeStamp = timestamp * 1000;
  } else if (timeStampLen === 13) {
    timeStamp = timestamp;
  } else {
    timeStamp = timestamp;
  }
  let date = new Date(timeStamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10 ?
    "0" + (date.getMonth() + 1) :
    date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // let s =
  //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let s = "00";
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

// 不同类型的时间
export const getTimesOtherType = function (timestamp) {
  let timeStamp;
  let timeStampLen = timestamp.toString().length;
  if (timeStampLen === 10) {
    timeStamp = timestamp * 1000;
  } else if (timeStampLen === 13) {
    timeStamp = timestamp;
  } else {
    timeStamp = timestamp;
  }
  let date = new Date(timeStamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10 ?
    "0" + (date.getMonth() + 1) :
    date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // let s =
  //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let s = "00";
  return `${Y}/${M}/${D} ${h}:${m}`;
};

export const getTimesOtherType_one = function (timestamp) {
  let timeStamp;
  let timeStampLen = timestamp.toString().length;
  if (timeStampLen === 10) {
    timeStamp = timestamp * 1000;
  } else if (timeStampLen === 13) {
    timeStamp = timestamp;
  } else {
    timeStamp = timestamp;
  }
  let date = new Date(timeStamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10 ?
    "0" + (date.getMonth() + 1) :
    date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // let s =
  //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let s = "00";
  return `${Y}-${M}-${D} ${h}:${m}`;
};

export const getSandM = function (timestamp) {
  let timeStamp;
  let timeStampLen = timestamp.toString().length;
  if (timeStampLen === 10) {
    timeStamp = timestamp * 1000;
  } else if (timeStampLen === 13) {
    timeStamp = timestamp;
  } else {
    timeStamp = timestamp;
  }
  let date = new Date(timeStamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10 ?
    "0" + (date.getMonth() + 1) :
    date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // let s =
  //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let s = "00";
  return `${h}:${m}`;
};

// 提示报错信息
export const putWarnMsg = (str) => {
  wx.showToast({
    title: str,
    icon: 'none',
    duration: 1500
  });
}