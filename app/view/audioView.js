Ext.define('testStoryApp.view.audioView', {
    extend: 'Ext.Panel',
    alias: 'widget.audiopanel',
 
    config: {
        height: '50%',
        // html: 'I am Panel Popup',
        itemId: 'audiopanel',
        left: '5%',
        padding: 10,
        top: '0%',
        width: '50%',
        hideOnMaskTap: true,
        modal: true,
    
    items: [
            {
                xtype: 'audio',
                hidden: false,
                id:'audio',
                // url: 'resources/audio/Story1.mp3'
         
            },
            {
                xtype: 'textfield',
                label: 'File Name',
                name: 'fileName'
            },
            {
                xtype: "button",
                text: "capture audio",
                flex:1,
                handler: function() {
                   // capture callback
                    var captureSuccess = function(mediaFiles) {
                        var i, path, len;
                        // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                        path = mediaFiles[0].fullPath;
                            // do something interesting with the file
                        // }

                        if(path.length>0)
                        {
                            var store=Ext.getCmp('capturelist').getStore();

                            window.localStorage.setItem(((window.localStorage.length+1).toString()),'A:'+path);

                            store.add({ title: 'yellow', type: 'audio note', url: path });

                            Ext.getCmp('capturelist').refresh();
                        }
                    };

                    // capture error callback
                    var captureError = function(error) {
                        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                    };

                    // start audio capture
                    navigator.device.capture.captureAudio(captureSuccess, captureError);
                }
            }
        ]
    }
});