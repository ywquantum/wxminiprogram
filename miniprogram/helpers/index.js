import {
  btoa
} from '../libs/base64.js'

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
  let s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  // let s = "00";
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export const getSelfTimes = function (timestamp) {
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
  let s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  // let s = "00";
  return `${Y}/${M}/${D} 00:00`;
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

export const getTimeOnlyYMD = function (timestamp) {
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
  return `${Y}-${M}-${D}`;
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

// 转换base64位数据
export const arrayBufferToBase64 = (buffer) => {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return `data:image/jpeg;base64,${btoa(str)}`;
}

export async function processImages(imgList) {
  const promises = imgList.map(async (imgData, index) => {
    return new Promise((resolve, reject) => {
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(imgData) || [];
      if (format) {
        const filePath = `${wx.env.USER_DATA_PATH}/temp_image_${index}.${format}`;
        wx.getFileSystemManager().writeFile({
          filePath: filePath,
          data: bodyData,
          encoding: 'base64',
          success: res => {
            resolve(filePath);
          },
          fail: err => {
            // console.error('写入文件失败', err)
          }
        })
      } else {
        resolve(imgData); // 直接返回 null
      }
    });
  });
  try {
    const results = await Promise.all(promises);
    const newImageList = results.filter(filePath => filePath !== null); // 过滤掉返回的 null
    return newImageList; // 返回新数组
  } catch (error) {
    return []; // 如果出错，返回空数组
  }
}