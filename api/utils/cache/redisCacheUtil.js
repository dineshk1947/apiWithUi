function RedisCacheUtill(){

}
RedisCacheUtill.prototype.get = function(baseUrl, url, callback){
    console.log("Inside cache");
    item = url;
    if (item === '/') {
        item = '0';
    }
    client.hgetall(baseUrl, function (err, cacheData) {
        if (cacheData && cacheData[item]) {
            callback(null, JSON.parse(cacheData[item]));
        } else {
            callback({status: 404});
        }
    });
}

RedisCacheUtill.prototype.set = function (baseUrl, url, data) {
    console.log("Inside set ");    
    item = url;
    if (item === '/') {
        item = '0';
    }
    client.hmset(baseUrl, item, JSON.stringify(data), function (err) {
        console.log("set error");
        console.log(err);
        return ({status: 206, error: err});
    });
};
RedisCacheUtill.prototype.delete = function (baseUrl, url) {
    client.del(baseUrl, '0');
    if (url !== '0') {
        client.del(baseUrl, url);
    }

};
module.exports = RedisCacheUtill;
