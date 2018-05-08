var config = {
    cloudac_server: 'http://cloudac.nonolive.com',
    appserv_url: 'https://cloudac.nonolive.com', 
    // appserv_url: 'http://52.77.95.9:5301', 
    // appserv_url: 'http://192.168.0.173:5301',
    upload_static_host: 'http://up.nonolive.com/',
    img_upload_server:  'http://up.nonolive.com/upload',
    // upload_static_host: 'http://192.168.0.36/',
    rekamaan_url : 'http://h5.nonolive.com/business/rekamaan/',
    chat_dispatcher_server : 'http://im.nonolive.com:80',
    h5Server_url : 'http://h5.livenono.com',
    // activity_server: 'https://cloudac.nonolive.com/nonolive/activityserv/'
    activity_server: 'http://cloudac.livenono.com/nonolive/activityserv/'
}

if(process.env.NODE_ENV === 'development'){
    // config.appserv_url = 'http://192.168.0.36:5401'
    //config.appserv_url = 'http://192.168.0.23:5301'
    // config.appserv_url = 'http://uc.h5.nonolive.com/nonolive/appserv'
     config.appserv_url = 'http://52.77.95.9:5301'
     config.img_upload_server = 'http://52.77.95.9:5501/upload'
     config.cloudac_server = 'http://192.168.0.23:6401'
    //  config.appserv_url = 'http://52.77.95.9:5301'
    
    // config.appserv_url = 'http://appserv.nonolive.com'
    config.rekamaan_url = 'http://192.168.0.23:5301/static/business/rekamaan/'
    config.video_server = 'https://cloudac.nonolive.com/nonolive/videocontent/'
    config.video_play_server = 'http://video.nonolive.com/download/media/'  
    config.PALYER_IMG_SERVER = 'http://vpic.nonolive.com/download/image/' 
    config.chat_dispatcher_server = 'http://im.nonolive.com:80'
    config.login_server = "http://cloudac.livenono.com"
    config.h5Server_url = 'http://h5.livenono.com'
    // config.activity_server = 'http://cloudac.livenono.com/nonolive/activityserv/'
    //config.activity_server = 'https://cloudac.nonolive.com/nonolive/activityserv/'
    config.activity_server = 'http://cloudac.livenono.com/nonolive/activityserv/'
}

if(process.env.NODE_ENV === 'test'){
    config.appserv_url = 'http://52.77.95.9:5301',
    config.img_upload_server = 'http://52.77.95.9:5501/upload'
    config.cloudac_server = 'http://cloudac.livenono.com',
    config.rekamaan_url = 'http://52.77.95.9:5301/static/business/rekamaan/'
    config.video_server = 'https://cloudac.nonolive.com/nonolive/videocontent/'
    config.login_server = "http://cloudac.livenono.com"
    config.h5Server_url = 'http://h5.livenono.com'    
    config.activity_server = 'http://cloudac.livenono.com/nonolive/activityserv/'
}

if(process.env.NODE_ENV === 'production'){
    config.img_upload_server = 'http://up.nonolive.com/upload'
    config.appserv_url = 'https://cloudac.nonolive.com'
    config.rekamaan_url = 'http://h5.nonolive.com/business/rekamaan/'
    config.cloudac_server = 'http://cloudac.nonolive.com',
    config.video_server = 'https://cloudac.nonolive.com/nonolive/videocontent/'
    config.video_play_server = 'http://video.nonolive.com/download/media/'  
    config.PALYER_IMG_SERVER = 'http://vpic.nonolive.com/download/image/'
    config.login_server = "http://uc.h5.nonolive.com"
    config.h5Server_url = 'http://h5.nonolive.com'        
    config.activity_server = 'https://cloudac.nonolive.com/nonolive/activityserv/'
}

module.exports = config