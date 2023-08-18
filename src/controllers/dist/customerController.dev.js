"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCustomer = exports.updateCustomer = exports.editCustomer = exports.createCustomers = exports.renderCustomers = void 0;

var _db = require("../db.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderCustomers = function renderCustomers(req, res) {
  var _ref, _ref2, rows;

  return regeneratorRuntime.async(function renderCustomers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db.pool.query("SELECT * FROM negocios"));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          res.render("customers", {
            customers: rows
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching customers:", _context.t0);
          res.status(500).send("Internal Server Error");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.renderCustomers = renderCustomers;

var createCustomers = function createCustomers(req, res) {
  var newCustomer;
  return regeneratorRuntime.async(function createCustomers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          newCustomer = req.body;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_db.pool.query("INSERT INTO negocios SET ?", [newCustomer]));

        case 4:
          res.redirect("/");
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error creating customer:", _context2.t0);
          res.status(500).send("Internal Server Error");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createCustomers = createCustomers;

var editCustomer = function editCustomer(req, res) {
  var id, _ref3, _ref4, result, negocios;

  return regeneratorRuntime.async(function editCustomer$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_db.pool.query("SELECT * FROM negocios WHERE id = ?", [id]));

        case 4:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          result = _ref4[0];
          negocios = result[0];
          res.render("customers_edit", {
            negocios: negocios
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error("Error editing customer:", _context3.t0);
          res.status(500).send("Internal Server Error");

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.editCustomer = editCustomer;

var updateCustomer = function updateCustomer(req, res) {
  var id, updatedCustomer;
  return regeneratorRuntime.async(function updateCustomer$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          updatedCustomer = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_db.pool.query("UPDATE negocios SET ? WHERE id = ?", [updatedCustomer, id]));

        case 5:
          res.redirect("/");
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating customer:", _context4.t0);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.updateCustomer = updateCustomer;

var deleteCustomer = function deleteCustomer(req, res) {
  var id, result;
  return regeneratorRuntime.async(function deleteCustomer$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_db.pool.query("DELETE FROM negocios WHERE id = ?", [id]));

        case 3:
          result = _context5.sent;

          if (result.affectedRows === 1) {
            res.json({
              message: "Customer deleted"
            });
          }

          res.redirect("/");

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteCustomer = deleteCustomer;