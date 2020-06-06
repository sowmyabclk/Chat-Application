/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chat.js":
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  pollId: null,
  isLoggedIn: false,
  messageList: [],
  userList: {},
  error: ''
};
var messageUserList = document.querySelector('.message-user-list');
var status = document.querySelector('.status');
var messageArea = document.querySelector('.new-message-info');
var login = document.querySelector('.login');
var logout = document.querySelector('.logout');
var messages = document.querySelector('.messages');
var users = document.querySelector('.users');
var errMsgs = {
  'network-error': 'There was a problem connecting to the network, try again',
  'bad-login': 'name should not be empty, does not contain whitespace and dog word',
  'not-allowed': 'something went wrong...',
  'unauthorized': "please login with username",
  'missing-name': "item name is missing",
  "empty-message": "message should not be empty"
};

function renderLogin(show) {
  var login = document.querySelector('.login');

  if (show) {
    var html = "\n        <h1 class = \"homepage-title\">Login Page</h1>  \n        <div class = \"login-info\">\n            <label class = \"user-name\">Username:</label><input class = \"user\" name=\"username\" placeholder=\"Enter User name\"/>\n        </div>\n        <button class =\"to-login\" type=\"submit\">Login</button>\n    ";
    login.innerHTML = html;
  } else {
    login.innerHTML = "";
  }
}

function renderMessageArea() {
  var html = "\n          <textarea class = \"new-message\" type=\"text\"  placeholder = \"Enter an Message\"></textarea>\n          <button class = \"send-message\" type=\"submit\">Send</button>\n      ";
  messageArea.innerHTML = html;
}

function renderLogout() {
  var logout = document.querySelector('.logout');
  var html = "\n      <button class = \"to-logout\" type=\"submit\">Logout</button>\n    ";
  logout.innerHTML = html;
}

function renderErrors(errorMessage) {
  status.innerHTML = errorMessage;
}

function renderPage() {
  if (!appState.isLoggedIn) {
    logout.innerHTML = '';
    messageArea.innerHTML = '';
    messageUserList.innerHTML = '';
    renderLogin(true);
  } else {
    renderLogin(false);
    renderLogout();
    renderMessageArea();
    messageUserList.append(messages);
    messageUserList.append(users);
  }

  renderErrors(appState.error);
}

login.addEventListener('click', function (e) {
  if (e.target.classList.contains('to-login')) {
    var username = document.querySelector('.user').value;
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function () {
      appState.isLoggedIn = true;
      appState.error = '';
      poll(true);
      renderPage();
    })["catch"](function (err) {
      if (err.error == 'not-allowed' || err.error == 'unauthorized') {
        appState.isLoggedIn = false;
        appState.error = errMsgs[err.error] || err.error;
        poll(false);
        renderPage();
      } else {
        appState.isLoggedIn = false;
        appState.error = errMsgs[err.error] || err.error;
        renderPage();
      }
    });
  }
});
logout.addEventListener('click', function (e) {
  if (e.target.classList.contains('to-logout')) {
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
      appState.isLoggedIn = false;
      poll(false);
      appState.error = '';
      renderPage();
    })["catch"](function (err) {
      appState.isLoggedIn = false;
      poll(false);
      appState.error = errMsgs[err.error] || err.error;
      renderPage();
    });
  }
});
messageArea.addEventListener('click', function (e) {
  if (e.target.classList.contains('send-message')) {
    var message = document.querySelector('.new-message').value;
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchMessages"])(message).then(function () {
      appState.isLoggedIn = true;
      appState.error = '';
      renderPage();
    })["catch"](function (err) {
      if (err.error == 'not-allowed' || err.error == 'unauthorized') {
        appState.isLoggedIn = false;
        poll(false);
        appState.error = errMsgs[err.error] || err.error;
        renderPage();
      } else {
        appState.isLoggedIn = true;
        appState.error = errMsgs[err.error] || err.error;
        renderPage();
      }
    });
  }
});

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchChats"])()["catch"](function (err) {
        if (err.error == 'not-allowed' || err.error == 'unauthorized') {
          appState.error = errMsgs[err.error] || err.error;
          appState.isLoggedIn = false;
          poll(false);
          renderPage();
        } else {
          appState.error = errMsgs[err.error] || err.error;
          renderPage();
        }
      }).then(function (chats) {
        appState.error = '';
        appState.isLoggedIn = true;
        appState.messageList = chats.messageList;
        appState.userList = chats.userList;
        renderMessages(appState.messageList, appState.userList);
        renderUsers(appState.userList);
      });
    }, 3000);
  }

  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

function renderChats(userList, messageList) {
  renderMessages(messageList, userList);
  renderUsers(userList);
}

function renderMessages(messageList, userList) {
  messages.innerHTML = messageList.map(function (message) {
    return "\n    <li>\n      <div class=\"message\">\n        <div class=\"message-info\">\n            <span class=\"username\">".concat(userList[message.sender].userName, "</span>\n            <span class=\"timestamp\">").concat(message.timeStamp, "</span>\n          </div>\n        <div class=\"message-text\">").concat(message.text, "</div>\n      </div>\n    </li>\n  ");
  }).join('');
}

function renderUsers(userList) {
  users.innerHTML = Object.values(userList).filter(function (user) {
    return user.active;
  }).map(function (user) {
    return "\n    <li>\n      <div class=\"user\">\n        <span class=\"username\">".concat(user.userName, "</span>\n      </div>\n    </li>\n  ");
  }).join('');
}

Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  appState.error = '';
  poll(true);
  renderPage();
})["catch"](function (err) {
  appState.isLoggedIn = false;
  renderPage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchLogout, fetchChats, fetchMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchChats", function() { return fetchChats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMessages", function() { return fetchMessages; });
var fetchLogIn = function fetchLogIn(userName) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      userName: userName
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchChats = function fetchChats() {
  return fetch('/chats', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json(response);
  });
};
var fetchMessages = function fetchMessages(message) {
  return fetch('/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};

/***/ })

/******/ });
//# sourceMappingURL=chat.js.map