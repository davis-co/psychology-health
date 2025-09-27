export const bToA = (obj) => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
};

export const aToB = (data) => {
  return JSON.parse(decodeURIComponent(escape(atob(data))));
};

export const classNames = (...props) => {
  return props.length
    ? props.reduce((sum, currentItem) => sum + " " + currentItem)
    : "";
};

export const chunkify = (a, n, balanced) => {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
};
export const parse = (res) => {
  var n = {};
  if (typeof res == "string")
    try {
      res = res.replace(/X@X@/g, "\\n");
      n = JSON.parse(res);
    } catch (E) {
      try {
        n = eval("(" + res + ")");
      } catch (E) {
        try {
          res = res.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
          n = JSON.parse(res);
        } catch (E) {
          n = eval("(" + res + ")");
        }
      }
    }
  else n = res;
  return n;
};

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
