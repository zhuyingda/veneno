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

var Q = require('q');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var request = require('../request');
var testToken = '' + new Date().getTime();

/**
 * xss dictionary
 */
var dict = fs.readFileSync(path.resolve(__dirname, 'dictionary')).toString();
dict = dict.split('\n');

module.exports = function (option) {
    var deferred = Q.defer();
    var scanReqFlow = _.map(option.params, function (param) {
        var queryObj = {};
        queryObj[param] = testToken;
        return request({
            uri: option.uri,
            method: 'get',
            query: queryObj,
            cookie: option.cookie
        });
    });
    Q.allSettled(scanReqFlow).then(function (rel) {
        console.log(rel);
        _.map(rel, function (data) {
            if(data.value.indexOf(testToken) !== -1){
                
            }
        })
    });
    return deferred.promise;
};