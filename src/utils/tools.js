import config from '../config'
import moment from 'moment'
import $ from 'webpack-zepto'

const level_color = ['#a7a7a7', '#2dc36c', '#2c8946', '#2178da', '#ff4777', '#e33737', '#e6c820', '#ef9827', '#65318e']

/**
 * 获取等级区间的等级颜色
 */
function get_level_section(level){
    if(level <= 4) return '#a7a7a7';
    if(level >4 && level <=35) return '#2dc36c';
    if(level >35 && level <=60) return '#2c8946';
    if(level >60 && level <=80) return '#2178da';
    if(level >80 && level <=100) return '#ff4777';
    if(level >100 && level <=115) return '#e33737';
    if(level >115 && level <=130) return '#e6c820';
    if(level >130 && level <=145) return '#ef9827';
    if(level >145 && level <=160) return '#65318e';
}

function DateDiff(interval,date1,date2){
    var long = date2.getTime() - date1.getTime(); //相差毫秒
    switch(interval.toLowerCase()){
    case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
    case "m": return parseInt((date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()-date1.getMonth()));
    case "d": return parseInt(long/1000/60/60/24);
    case "w": return parseInt(long/1000/60/60/24/7);
    case "h": return parseInt(long/1000/60/60);
    case "n": return parseInt(long/1000/60);
    case "s": return parseInt(long/1000);
    case "l": return parseInt(long);
    }
}

function returnHandler(urlParams, cb){
    $.get(urlParams,function(result) {
        //处理时差导致的签名错误
        if(result.code == 1403){
            if(window.localStorage.getItem('timestamp_diff') != 0){
                window.localStorage.setItem('timestamp_diff',0)
            }else{
                var new_diff = DateDiff('n',new Date(rd.timestamp),new Date(result.timestamp))
                window.localStorage.setItem('timestamp_diff',new_diff)
            }
        }

        cb(result)
    })
}

//发送请求方法
var request = {
    //添加签名的get方法
    getBySign: function(url,params,cb){
        params = handle_params(params)
        if(window.UA.indexOf('Nonolive') > -1){
            window.jssdk.callNative('getSign',params,function(rd){
                rd.timestamp = params.timestamp
                //处理返回的数据（目前android和ios返回的数据结构不一样）
                if(rd.sign){
                    var sign = rd.sign
                }else{
                    var sign = rd.body.sign
                }
                var urlParams=url+'?sign='+sign
                Object.getOwnPropertyNames(params).forEach(function(item) {
                    urlParams+="&"+item+'='+urlEncode(params[item])
                })
                
                returnHandler(urlParams, cb)
            })
        }else{
            Object.getOwnPropertyNames(params).forEach(function(item, index) {
                if(index == 0){
                    url+="?"+item+'='+urlEncode(params[item])
                }else{
                    url+="&"+item+'='+urlEncode(params[item])
                }
            })

            returnHandler(url, cb)
        }
    },
    //添加签名的post方法
    postBySign: function(url,params,cb){
        params = handle_params(params)
        window.jssdk.callNative('getSign',params,function(rd){
            rd.timestamp = params.timestamp
            //处理返回的数据（目前android和ios返回的数据结构不一样）
            if(rd.sign){
                params.sign = rd.sign
            }else{
                params.sign = rd.body.sign
            }
            
            $.post(url,params,function(result) {
                //处理用户手动设置时间导致的签名错误
                if(result.code == 1403){
                    if(window.jssdk.localStorage.getItem('timestamp_diff') != 0){
                        window.jssdk.localStorage.setItem('timestamp_diff',0)
                    }else{
                        var new_diff = window.jssdk.DateDiff('n',new Date(rd.timestamp),new Date(result.timestamp))
                        window.jssdk.localStorage.setItem('timestamp_diff',new_diff)
                    }
                }

                cb(result)
            })
        })
    }
}

function handle_params(params){
    /**
     * H5中的签名方法处理时差
     */
    var diff = 0
    if(window.localStorage && window.localStorage.getItem('timestamp_diff')){
        diff = Number(window.localStorage.getItem('timestamp_diff'))
    }

    //应用内正常传递公参
    if(window.UA.indexOf('Nonolive') > -1){
        var timestamp = new moment().add(diff,'minutes').format()
        params.timestamp = timestamp
        var public_param = window.UA.split('/');
        //因为android返回的UA格式和ios不同，要处理一下
        var public_params = public_param[0].split(/\s+/)
        public_param = public_params.concat(public_param.slice(1))
        //添加公参
        params.__v = public_param[1]
        //平台公参统一为小写
        params.__platform = public_param[2].toLowerCase()
        params.__bm = public_param[4]
        if(window.localStorage.getItem('guest_id')) params.__guest_id = window.localStorage.getItem('guest_id')
        if(window.localStorage.getItem('user_id')) params.__user_id = window.localStorage.getItem('user_id')
        if(navigator.browserLanguage) params.__la = navigator.browserLanguage
        else  params.__la = navigator.language
        if(public_param[6])params.__location=public_param[6]
        if (public_param[7]) params.__sp = public_param[7]
        params.__h5 = 1
    }else{
        //应用外只传递这两个公参
        params.__platform = 'web'
        params.__h5 = 1
    }

    return params
}

function urlEncode(url) {
    url = encodeURIComponent(url)
    url = url.replace(/\+/g, '%2B')
    url = url.replace(/\s/g, '%20')
    url = url.replace(/#/g, '%23')
    url = url.replace(/\$/g, '%24')
    url = url.replace(/&/g, '%26')
    url = url.replace(/\?/g, '%3F')
    url = url.replace(/\=/g, '%3D')
    return url
}

function handlePic(url, defaulturl) {
    if (!url)
        return defaulturl
    else if (url.indexOf('/res/img') == 0)
        return url
    else if (url.indexOf('data:image') === 0) {
        return url
    }
    else if (!url.indexOf('http') == 0)
        return config.upload_static_host + url;
    else
        return url
}

function isNullObj(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return arr[2]; return null;
};

function getUserInfo(){
    return new Promise((resolve, reject)=>{
        if(window.UA.indexOf('Nonolive') > -1){
            return window.jssdk.callNative('user.current', {}, result => {
                var user = result.body;
                return resolve(user)
            })
        }
    
        var user = getCookie('user') ? JSON.parse(decodeURIComponent(getCookie('user'))) : null
        
        return resolve(user)
    })
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 格式化积分
function formatPoint(num) {
    if (num) {
        if (Number(num) > 100000) {
            num = (Number(num) / 1000).toFixed(1)
            return num.toString() + 'K'
        } else {
            return num
        }
    } else {
        return 0
    }
}

// 读取URL参数
function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}

function toFamily(family_id) {
    window.location.href = "http://m.nonolive.com/views/family_profile.html" + '?family_id=' + family_id  
}

function toProfile(user_id) {
    if (!user_id) {
        return;
    }
    let UA = window.UA
    if(window.UA.indexOf('Nonolive') > -1) {
        window.jssdk.callNative('gotoPage', {pagename: 'user', user_id});
    } else {
        let url = 'http://uc.h5.nonolive.com/profile/' + user_id
        window.location.href = url
    }
}
// 解决遮罩层滚动穿透的两个工具方法
function fixedBody() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;';
}

function looseBody() {
    var body = document.body;
    body.style.position = '';
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}

module.exports = {
    request: request,
    urlEncode: urlEncode,
    handlePic: handlePic,
    isNullObj: isNullObj,
    level_color : level_color,
    get_level_section : get_level_section,
    getParameterByName,
    getCookie,
    getUserInfo,
    formatPoint,
    getQuery,
    toFamily,
    toProfile,
    fixedBody,
    looseBody
}