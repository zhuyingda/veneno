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
/**
 * @desc 集成化xss扫描工具
 */
'use strict';
// 目前仅支持http协议的网站
// 挂上代理在网站上进行操作即可

const proxy = require('../src/proxy');
const storage = require('../src/storage');
const xss = require('../src/xss');
let len = 0;

proxy();

setInterval(function () {
    let list = storage.list();
    if (list.length === len) {
        return;
    }
    len = list.length;
    xss.durable({
        apiList: list,
        watchList: list,
        log: 'none'
    });
    for (let i in list) {
        xss.selfXss({
            url: list[i].url,
            params: list[i].params,
            log: "none"
        })
    }
}, 10000);