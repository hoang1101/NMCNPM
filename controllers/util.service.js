//khi trả về Error Web Response
module.exports.ReE = function (res, err, text) {
  // Error Web Response

  return res.json({ success: false, error: err, msg: text });
};
//trả về Success Web Response
module.exports.ReS = function (res, stt, text) {
  // Success Web Response
  console.log(text);
  return res.json({ success: true, code: stt, msg: text });
};
//trả trực tiếp về lỗi
module.exports.TE = function (err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }
  throw new Error(err_message);
};

module.exports.SS = function (res, data, satus = 200) {
  let send_data = { success: true };
  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  if (typeof code !== "undefined") res.satus = satus;
  return res.json(send_data);
};

module.exports.TT = function (res, data, statuscode = 200) {
  // Success Web Response
  let send_data = { success: true };

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = statuscode;

  return res.json(send_data);
};
