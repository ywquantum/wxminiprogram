// export const baseHttpUrl = 'http://121.37.128.61:8000/'
export const baseHttpUrl = 'https://api.sc-link.cn/'
const header = {
  'Content-Type': 'multipart/form-data; boundary=boundary'
}
const app = getApp();

export function request(url, method, data) {
  let formData = data
  let formDataStr = ''
  for (let key in formData) {
    formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${formData[key]}\r\n`
  }
  formDataStr += '--boundary--'

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseHttpUrl + url,
      method: method,
      data: formDataStr,
      header: header,
      success: function (res) {
        // 请求成功时调用 resolve 并将返回的数据传递给它
        resolve(res);
      },
      fail: function (err) {
        // 请求失败时调用 reject 并将错误信息传递给它
        reject(err);
      }
    });
  });
}

export function requestToken(url, method, data) {
  // let formData = data
  // let formDataStr = ''
  // for (let key in formData) {
  //   formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${formData[key]}\r\n`
  // }
  // formDataStr += '--boundary--'

  let formDataStr = '';
  for (let key in data) {
    if (Array.isArray(data[key])) {
      if (data[key].length == 0) {
        formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}[]"\r\n\r\n${''}\r\n`;
      } else {
        data[key].forEach((item, i) => {
          formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}[${i}]"\r\n\r\n${item}\r\n`;
        });
      }
    } else {
      formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${data[key]}\r\n`;
    }
  }
  formDataStr += `--boundary--`;

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseHttpUrl + url,
      method: method,
      data: formDataStr,
      header: {
        'Content-Type': 'multipart/form-data; boundary=boundary',
        'token': app.globalData.userToken
      },
      success: function (res) {
        // 请求成功时调用 resolve 并将返回的数据传递给它
        resolve(res.data);
      },
      fail: function (err) {
        // 请求失败时调用 reject 并将错误信息传递给它
        reject(err);
      }
    });
  });
}

export function requestToimgs(url, method, data) {
  let formDataStr = '';
  for (let key in data) {
    if (Array.isArray(data[key])) {
      if (data[key].length == 0) {
        formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}[]"\r\n\r\n${''}\r\n`;
      } else {
        data[key].forEach((item, i) => {
          formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}[${i}]"\r\n\r\n${item}\r\n`;
        });
      }
    } else {
      formDataStr += `--boundary\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${data[key]}\r\n`;
    }
  }
  formDataStr += `--boundary--`;

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseHttpUrl + url,
      method: method,
      data: formDataStr,
      responseType: 'arraybuffer',
      header: {
        'Content-Type': 'multipart/form-data; boundary=boundary',
        'token': app.globalData.userToken
      },
      success: function (res) {
        // 请求成功时调用 resolve 并将返回的数据传递给它
        resolve(res.data);
      },
      fail: function (err) {
        // 请求失败时调用 reject 并将错误信息传递给它
        reject(err);
      }
    });
  });
}