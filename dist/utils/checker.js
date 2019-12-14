"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidBody = isValidBody;
exports.BodyError = void 0;
var BodyError = {
  NOT_FOUND_ERR: -1,
  FORMAT_ERR: -2
};
exports.BodyError = BodyError;

function isValidBody(body) {
  if (!body) {
    return BodyError.NOT_FOUND_ERR;
  }

  if (!body['hypothesis']) {
    return BodyError.FORMAT_ERR;
  }

  return 1;
}