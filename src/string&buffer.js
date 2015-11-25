'use strict';
let string,string2,string3;
let bufstr,bufstr2,bufstr3;
let j;

console.time('write 1000 string')
for(j=0;j<1000;j++){
    let x = j+'';
    string += x;
}
console.timeEnd('write 1000 string')

console.time('write 1000 buffer')
bufstr = new Buffer(1000)
for(j=0;j<1000;j++){
    let x = j+'';
    bufstr.write(x,j);
}
console.timeEnd('write 1000 buffer')


console.time('write 100000 string')
for(j=0;j<100000;j++){
    let x = j+'';
    string2 += x;
}
console.timeEnd('write 100000 string')

console.time('write 100000 buffer')
bufstr2 = new Buffer(100000)
for(j=0;j<100000;j++){
    let x = j+'';
    bufstr2.write(x,j);
}
console.timeEnd('write 100000 buffer')

console.time('write 1024*1024*10 string')
for(j=0;j<1024*1024*10;j++){
    let x = j+'';
    string3 += x;
}
console.timeEnd('write 1024*1024*10 string')

console.time('write 1024*1024*10 buffer')
bufstr3 = new Buffer(1024*1024*10)
for(j=0;j<1024*1024*10;j++){
    let x = j+'';
    bufstr3.write(x,j);
}
console.timeEnd('write 1024*1024*10 buffer')