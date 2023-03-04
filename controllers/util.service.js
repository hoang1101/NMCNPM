//khi trả về Error Web Response
module.exports.ReE = function (res, err, text) {
  // Error Web Response

  return res.json({ success: false, error: err, msg: text });
};
//trả về Success Web Response
module.exports.ReS = function (res, stt, text) {
  // Success Web Response
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
