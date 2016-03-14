"use strict";
var xss = require('../src/xss').reflect;

xss('http://192.168.1.101:3000/xss',"param1");