export const paramsObjToUrlFD = (obj: Record<string, any>) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      formData.append(key + "[]", "");
      obj[key].forEach((el) => {
        formData.append(key + "[]", el);
      });
    } else if (typeof obj[key] === "object") {
      for (const subKey in obj[key]) {
        formData.append(`${key}[${subKey}]`, obj[key][subKey]);
      }
    } else {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

export const responseHeadersToObj = (headers: Headers) => {
  const headersObj: Record<string, string> = {};
  headers.forEach((val, key) => { 
    headersObj[key] = val
  });

  return headersObj;
}
