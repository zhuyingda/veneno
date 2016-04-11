项目介绍
============

一个用Node.js编写的Web安全测试框架

a Web security tool written by NodeJs.


测试方法
============
安装依赖
------------

```
npm install
```

启动环境
-----------
```
npm test
```

打开新的命令行执行测试用例
-----------

测试爬虫模块

```
node test/spider.js
```

测试持久型XSS扫描模块, 需说明的一点, 需要创建src/dictionary文件作为xss扫描的字典, 因为这个文件是git ignore的

```
node test/xss_durable.js
```

测试反射型XSS扫描模块

```
node test/xss_reflect.js
```

测试C++扩展

```
node test/cc_addon.js
```

description(项目背景介绍)
------------------
[official website(官方文档)](http://www.zhuyingda.com/docs/veneno.html)
