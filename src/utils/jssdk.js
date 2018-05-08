'use strict'
window.UA = navigator.userAgent

//读取URL参数
var getQuery = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}

if(window.UA.indexOf('Nonolive') > -1){
    // Compatible With CustomEvent
    if (!window.CustomEvent) {
        window.CustomEvent = function (type) {
            var e = document.createEvent('CustomEvent');
            e.initCustomEvent(type, false, false);
            return e;
        };
    }
    
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        if((UA.indexOf('iOS')>-1) && (UA.indexOf('1.2.0')>-1)){
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';           //ios旧版
        }else{
            WVJBIframe.src = 'nonolivescheme://__BRIDGE_LOADED__';
        }
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }   
    
    function JSSDK(){
    }
    
    // JSSDK.prototype.moment = moment;
    
    // var hybrid_ready = 0
    // document.addEventListener('DOMContentLoaded', function() {
    //     hybrid_ready++
    //     if(hybrid_ready>1) document.dispatchEvent(new CustomEvent('JSSDKReady'))
    // }, false)        
    
    setupWebViewJavascriptBridge(function(bridge) {
        JSSDK.prototype.callNative = function(method, params, cb) {
            // var fn = function(){
                if(bridge || typeof(bridge.callHandler) =='function' )
                    bridge.callHandler(method, params, function(response) {
                        if(typeof(cb)=='function'){
                            cb(response)
                        }
                    })
            //     else{
            //         setTimeout(function(){
            //             fn()
            //         },500)
            //     }
            // }
            // fn()
        }
    
        // hybrid_ready++
        // if(hybrid_ready>1)
            document.dispatchEvent(new CustomEvent('JSSDKReady'))    
    })
    
    /**
     * 兼容旧版本不支持localStorage或加载localStorage失败的情况。即不缓存
     */
    JSSDK.prototype.localStorage = {
        setItem : function(key, value){
            if(window.localStorage){
                try{
                    window.localStorage.setItem(key,value)
                }catch(e){
                    window.localStorage.clear()
                    window.localStorage.setItem(key,value)
                }
                return true
            }else{
                return false
            }
        },
        getItem: function(key){
            if(window.localStorage){
                return window.localStorage.getItem(key)
            }else{
                return false
            }
        }
    }
    
    JSSDK.prototype.isAndroid = function(){
        return window.UA.indexOf('/android/')!=-1
    }
    JSSDK.prototype.isIOS = function(){
        return window.UA.indexOf('/iOS/')!=-1
    }
    
    //读取URL参数
    JSSDK.prototype.getQuery = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return '';
    }
    
    JSSDK.prototype.DateDiff = function(interval,date1,date2){
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
    
    window.jssdk = new JSSDK()
}else{
    setTimeout(function(){
        document.dispatchEvent(new CustomEvent('JSSDKReady'))   
    })
}


// if(DEBUG){
//     require.ensure(["./jssdk.mock.js"], function (require) {
//         require("./jssdk.mock.js");
//         // console.log(window.UA)
//     })
// }