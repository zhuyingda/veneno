/**
 * Copyright (c) 2017 5u9ar (zhuyingda)
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('request');
var Q = require('q');
var _ = require('underscore');

/**
 * Pretend a win 7 chrome browser
 */
var defaultUa = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';

/**
 * check input parameter
 */
function isValidOption(option) {
    var inputOption = _.extend({}, option);
    var uriReg = /^http(s|):\/\/((\w|\W)+?\.)+?\w+?(:\d+?)?\//;
    var validMethod = ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE'];
    if (typeof inputOption !== 'object') {
        return false;
    }
    if (typeof inputOption.uri !== 'string') {
        return false;
    }
    if (!uriReg.test(inputOption.uri)) {
        if (!/^http(s|):\/\/localhost\//.test(inputOption.uri)) {
            return false;
        }
    }
    if (typeof option.method === 'string') {
        return _.contains(validMethod, option.method.toUpperCase());
    }
    return true;
}

/**
 * deal with cookie string
 */
function dealCookie(cookieStr, uri) {
    var jar = request.jar();
    var cookies = cookieStr.split(";");
    for (var i in cookies) {
        var cookie = request.cookie(cookies[i]);
        jar.setCookie(cookie, uri);
    }
    return jar;
}

/**
 * @desc http request
 * @type promise
 */

module.exports = function (option) {
    var deferred = Q.defer();

    // check input
    if (!isValidOption(option)) {
        var err = new Error('request method invalid parameter');
        deferred.reject(err);
        return deferred.promise;
    }
    var param = _.defaults({
        uri: option.uri
    }, {
        method: 'GET',
        headers: {
            'User-Agent': defaultUa
        }
    });

    // deal input
    if (option.cookie) {
        param.jar = dealCookie(option.cookie, param.uri);
    }
    if (option.proxy) {
        param.proxy = option.proxy;
    }
    param.method = param.method.toUpperCase();
    if (param.method === 'GET' && option.query) {
        param.qs = option.query;
    } else {
        param.body = option.body;
    }

    // send request
    request(param, function (err, resp, body) {
        if (err === null) {
            deferred.resolve({
                resp: body,
                origResp: resp
            });
        } else {
            deferred.reject(err);
        }
    });
    return deferred.promise;
};