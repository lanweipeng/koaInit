const static = require('koa-static')
module.exports = function (router, options) {
    options = options || {};
    options.images = options.images || 30;
    options.script = options.script || 1;
    options.html = options.html || 30;
    options.style = options.style || 30;
    options.other = options.other || 7;
    router.all(/((\.png)||(\.jpg)||(\.gif))$/i, static('./static', {
        maxage: options.images * 86400 * 1000
    }))
    router.all(/((\.js)||(\.jsx))$/i, static('./static', {
        maxage: options.script * 86400 * 1000
    }))
    router.all(/((\.html)||(\.htm))$/i, static('./static', {
        maxage: options.images * 86400 * 1000
    }))
    router.all('*', static('./static', {
        maxage: options.images * 86400 * 1000
    }))

}