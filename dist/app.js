"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _checker = require("./utils/checker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3030;
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use('/', _index["default"]);
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.get('/ping', function (req, res) {
  res.send('Success');
});
app.post('/hypothesis', function (req, res) {
  if (!req) {
    sendRes(res, 417, 'Expected request field');
    return;
  }

  var validInput = (0, _checker.isValidBody)(req.body);

  if (validInput < 0) {
    switch (validInput) {
      case _checker.BodyError.NOT_FOUND_ERR:
        {
          sendRes(res, 417, 'Expected request body field');
          return;
        }

      case _checker.BodyError.FORMAT_ERR:
        {
          sendRes(res, 417, 'Missing "hypothesis" field');
          return;
        }

      default:
        {
          return;
        }
    }
  }

  var sHypothesis = req.body['hypothesis'];
  console.log('Body content:', sHypothesis);
  sendRes(res, 200, sHypothesis);
});
app.listen(port, function () {
  console.log("Server started with port: ".concat(port));
});

function sendRes(res, code, msg) {
  res.send(msg);
  res.sendStatus(code);
}

var _default = app;
exports["default"] = _default;