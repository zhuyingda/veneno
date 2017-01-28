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
 * @desc 解析uri为xss模块需要的格式
 */
'use strict';

module.exports = parser;

function parser(uri) {
    let uriSecs = uri.match(/(^http(s|):\/\/[\w|\W]+)\?([\w|\W]+)/);
    let ret = {
        isHttps: false,
        hasParam: true
    };
    if (uriSecs === null) {
        return {
            hasParam: false
        };
    }
    if (uriSecs[2] === 's') {
        ret.isHttps = true;
    }
    ret.apiName = uriSecs[1];
    ret.apiParams = [];
    let params = uriSecs[3].split('&');
    for (let i in params) {
        let param = params[i].match(/(^[\w|\W]+)=[\w|\W]*$/)[1];
        ret.apiParams.push(param);
    }
    return ret;
}
