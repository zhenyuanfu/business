import './jssdk.js'
import FastClick from './fastclick.js'

if ('addEventListener' in document && window.UA.indexOf('iOS') > -1) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}