export const bToA = (obj) => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
}

export const aToB = (data) => {
  return JSON.parse(decodeURIComponent(escape(atob(data))))
}

// export const swap = (json) => {
//   const ret = {};
//   for(var key in json){
//     ret[json[key]] = key;
//   }
//   return ret;
// }

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}