Ext.define('testStoryApp.view.cameraView', {
    extend: 'Ext.Panel',
    alias: 'widget.Popup',
 
    config: {
        height: '50%',
        // html: 'I am Panel Popup',
        itemId: 'popup',
        left: '5%',
        padding: 10,
        top: '0%',
        width: '50%',
        hideOnMaskTap: true,
        modal: true,
    
    items: [
            {
                xtype: "image",
                src: "http://placehold.it/100x100",
                width: '20%',
                height: '20%'
               
            },
            {
                xtype: 'textfield',
                label: 'File Name',
                name: 'fileName'
            },
            {
                xtype: "button",
                text: "capture",
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
                            alert('captured image path is '+path);

                            var img = Ext.ComponentQuery.query("image")[0];
                            img.setSrc(path);

                            //local store update
                            window.localStorage.setItem(((window.localStorage.length+1).toString()),'I:'+path);

                            var store=Ext.getCmp('capturelist').getStore();

                            store.add({ title: 'green', type: 'picture note', url: path });

                            Ext.getCmp('capturelist').refresh();
                        }

                    // }
                };

                    // capture error callback
                    var captureError = function(error) {
                        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                    };

                    // start image capture
                    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
                }
            }
        ]
    }
});