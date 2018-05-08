import en from './en.json'
import id from './id.json'
import tr from './tr.json'

var I18N = function(locale){
    if(locale.indexOf('id') > -1 || locale.indexOf('in') > -1) {
        this.locale = id
    }else if (locale.indexOf('tr') > -1){
        this.locale = tr
    } else {
        this.locale = en
    }
}

I18N.prototype.getLocale = function(str){
    return this.locale[str] || str
}
var i18n = new I18N(weex.config.__la || 'en')

function t(str, config){
    if (config && Object.keys(config).length > 0) {
        let result = i18n.getLocale(str)
        for (let key in config) {
            const reg = new RegExp("\\${" + key + "}", "gm")
            result = result.replace(reg, config[key])
        }
        return result
    } else {
        return i18n.getLocale(str)
    }
}

export default t