var arr = [];

module.exports = {
    add: function (obj) {
        arr.push(obj);
    },
    list: function () {
        return arr;
    }
};