Ext.define('testStoryApp.view.videoView', {
    extend: 'Ext.Panel',
    alias: 'widget.videopanel',
 
    config: {
        height: '50%',
        // html: 'I am Panel Popup',
        itemId: 'videopanel',
        left: '5%',
        padding: 10,
        top: '0%',
        width: '50%',
        hideOnMaskTap: true,
        modal: true,
    
    items: [
            {
            xtype    : 'video',
            // x        : 600,
            // y        : 300,
            width    : 175,
            height   : 98,
            url      : "porsche911.mov",
            // posterUrl: 'porsche.png'
       
               
            },
            {
                xtype: 'textfield',
                label: 'File Name',
                name: 'fileName'
            },
            {
                xtype: "button",
                text: "capture video",
                flex:1,
                handler: function() {
                   // capture callback
                    var captureSuccess = function(mediaFiles) {
                        var i, path, len;
                        // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                            path = mediaFiles[0].fullPath;
                            // do something interesting with the file

                            if(path.length>0)
                            {
                                var img = Ext.ComponentQuery.query("video")[0];
                                // alert('image url'+img.getUrl());
                                img.setUrl(path);
                                // alert('after setting the image url'+img.getUrl());
                                var store=Ext.getCmp('capturelist').getStore();

                                window.localStorage.setItem(((window.localStorage.length+1).toString()),'V:'+path);

                                store.add({ title: 'blue', type: 'video note', url: path });

                                Ext.getCmp('capturelist').refresh();
                            }
                    };

                    // capture error callback
                    var captureError = function(error) {
                        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                    };

                    // start video capture
                    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
                }
            }
        ]
    }
});