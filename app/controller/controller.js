Ext.define('testStoryApp.controller.controller', {
    extend: 'Ext.app.Controller',

   
    config: {

        refs: {
         
            camera: 'mainview > #widgets > #camera' ,
            video: 'mainview > #widgets > #video' ,
            note: 'mainview > #widgets > #note' ,
            audio: 'mainview > #widgets > #audio',
            view: 'mainview > #widgets > #changeView',
            gridView:'mainview > #gridView ',
            listView:'mainview > #capturelist'

        },

        control: {

            camera: {
                tap: 'onCamera' 
            },
            video:{
                tap:'onVideo'
            },

            note:{
                tap:'onNote'
            },

            audio:{
                tap:'onAudio'
            },

            view:{
                tap: 'changeIconOnButtonTap'
            },

            // gridView:{
            //     itemtouchend:'onGridSelect'
            // },

            // listView:{
            //     itemtap:'fun'
            // },


            "#camera": {
                tapped: 'onButtonLoginButtonTap'
            },
            "#video": {
                tapped: 'onButtonVideoTap'
            },
            "#audio":{
                tapped:'onButtonAudioTap'
            },
            "#note":{
                tapped:'onButtonNoteTap'
            }
        }

        
    },

    onCamera:function()
    {

        var urlpath;
        
        var captureSuccess = function(mediaFiles,fun) {
             var i, path, len;
             // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
             path = mediaFiles[0].fullPath;
            // do something interesting with the file
            
            //rename the file which is created


            var date= new Date();
            // alert(path+date);

            // if(path.length>0)
            // {
            //     // alert('captured image path is '+path);

            //     // var img = Ext.ComponentQuery.query("image")[0];
            //     // img.setSrc(path);

            //     //local store update
            //     window.localStorage.setItem(((window.localStorage.length+1).toString()),'I:'+path);

            //     // var store=Ext.getCmp('capturelist').getStore();
            //     var store=Ext.getStore('myStoreID');

            //     // alert('store' +store);

            //     store.add({ title: 'green', type: 'picture note', url: path });

            //     Ext.getCmp('capturelist').refresh();
            // }

            alert('path is'+path);
            urlpath='path';
            moveFile(path);

               window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, function(fs){alert('succs')}, function(e){alert('fail '+e.code) });
            // fun(urlpath);            


           

            // setpath(path);
        };
      
        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        // alert('url path is '+urlpath);
       
        
        function filesuccess(entry) {
               console.log("New Path: " + entry.fullPath);
        }



        function moveFile(url) {

            alert('write code to move file'+url.lastIndexOf('/'));
            // var parentName = url.substring(url.lastIndexOf('/')+1);
            // alert('parentname'+parentname);

            // var parentEntry = new DirectoryEntry(parentName, url);

            // alert('parentEntry'+parentEntry.toURL());


            // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            // function gotFS(fileEntry) {
            //             // alert('url is');//+fileEntry.toUrl());
            //             fileSystem.root.getFile(url, {create: false, exclusive: false}, gotFileEntry, fail);
            //             // fileEntry.createWriter(gotFileWriter, fail);
                        

            // };

            //  function gotFileEntry(fileEntry) {
            //             // alert('url is');//+fileEntry.toUrl());
            //             fileEntry.moveTo
                        

            // };

            // var parent = document.getElementById('parent').value,
            //     parentName = parent.substring(parent.lastIndexOf('/')+1),
            //     parentEntry = new DirectoryEntry(parentName, parent);

            // // move the file to a new directory and rename it
            // entry.moveTo(parentEntry, "newFile.txt", success, captureError);
        }


    },


    onVideo:function()
    {
        var captureSuccess = function(mediaFiles) {
            var i, path, len;
           for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[0].fullPath;

            // alert(path.length);
        }
            // do something interesting with the file
            // alert('in her er'+path);
            if(path.length>0)
            {
               // var img = Ext.ComponentQuery.query("video")[0];
                // alert('image url'+img.getUrl());
                //img.setUrl(path);
                // alert('after setting the image url'+img.getUrl());
                //var store=Ext.getCmp('capturelist').getStore();
                var store=Ext.getStore('myStoreID');

                // alert(path);

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
    },

    onNote: function(button, e, eOpts)
    {
        if (!button.sheet) {
            //action sheet are essentially used to have some buttons for specific usage
            button.sheet = Ext.widget('sheet', {
            // html: 'Some text inside of the sheet', 
           // style: 'color: white; font-weight: bold', 
            // stretchX: true, stretchY:true,
            height: window.innerHeight,
            width: window.innerWidth,
            hideOnMaskTap: true,
            layout:'vbox',
             scrollable: true,
            items:[
            {
                xtype: 'textareafield',
                id:'note',
                label: 'Note',
                maxRows: 10,
                flex:1,
                // maxHeight:'80%'
            },
            {
                xtype:'button',
                text: 'Save',
                listeners: {
                tap: function (btn, e, eOpts) { 
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

                     function gotFS(fileSystem) {
                        
                        fileSystem.root.getFile('readNote.txt', {create: true, exclusive: false}, gotFileEntry, fail);

                        //var store=Ext.getCmp('capturelist').getStore();
                        var store=Ext.getStore('myStoreID');

                        var path="resources/icons/notes.png"

                        window.localStorage.setItem(((window.localStorage.length+1).toString()),'N:'+path);

                        // alert('geeting the stored element'+window.localStorage.getItem(((window.localStorage.length+1).toString())));

                        store.add({ title: 'white', type: 'Note', url: path });

                        Ext.getCmp('capturelist').refresh();
                    }

                    function gotFileEntry(fileEntry) {
                        // alert('url is');//+fileEntry.toUrl());
                        fileEntry.createWriter(gotFileWriter, fail);
                        

                    }

                    function gotFileWriter(writer) {
                        
                        //get the text from the text box
                        var note=Ext.getCmp('note').getValue();
                        alert(note);
                        writer.write(note);

                    }

                    function fail(error) {
                        console.log(error.code);
                        alert('failed');
                    }

                    button.sheet.hide();
                } }
            },
            {
                xtype:'button',
                text: 'Cancel',
                // flex:1,
                listeners: {
                tap: function (btn, e, eOpts) { button.sheet.hide();
                    } }
            }]
            });
            Ext.Viewport.add(button.sheet);
        }//end of if
    button.sheet.show(); 
    },

    onAudio: function()
    {
        var captureSuccess = function(mediaFiles) {
            var i, path, len;
            // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[0].fullPath;
                // do something interesting with the file
            // }

            if(path.length>0)
            {
                // var store=Ext.getCmp('capturelist').getStore();
                var store=Ext.getStore('myStoreID');

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
    },
 
    onButtonLoginButtonTap: function(arg) {
        // alert(arg);
        // alert(arg.getId());
        // Ext.Msg.alert("ues");

          // var me = arg;
        var popup = Ext.widget('Popup'); // Get reference of the panel popup
        popup.showBy(arg);  // Call the method to display the panel popup
    },

    onButtonVideoTap: function(arg){
        
        var popup=Ext.widget('videopanel');
        popup.showBy(arg);
    },

    onButtonAudioTap: function(arg){
        
        var popup=Ext.widget('audiopanel');
        popup.showBy(arg);
    },
    
    onButtonNoteTap: function(arg){
        
        // var popup=Ext.widget('notePopup');
        // // alert(popup.getId());
        // Ext.Viewport.add(popup);
        


        // popup.show();
        // popup.showBy(arg);
    },

    launch: function()
    {

        var store=Ext.getStore('myStoreID');
        // alert('got store'+store);
        // var store=Ext.getCmp('capturelist').getStore();
        
        var path;

        // window.localStorage.clear();

        // alert(window.localStorage.length);
        // alert(window.localStorage.key('0'));

        // alert('cleared the storage'+window.localStorage.length);

         // window.localStorage.setItem("0", "picture:urlvalue");

         // alert('now the storage size'+window.localStorage.length);

         // alert(window.localStorage.getItem("0"));
        


         var capturetype;

        for (i = 0; i < window.localStorage.length-1; i++) {

            
            path=window.localStorage.getItem(window.localStorage.key(i.toString()));
            // alert('path'+path);

            if(path.length>0)
            {

            // alert('original path'+path);

                capturetype=path.substr(0,1);

                if(capturetype =="I")
                {
                    capturetype="image";
                }
                else if(capturetype=="V")
                {
                    capturetype="video";
                }
                else if(capturetype=="N")
                {
                    capturetype="note";
                   
                }
                else if(capturetype=="A")
                {
                    capturetype="audio";
                }

                path=path.substr(2,path.length-1);

               
                store.add({ title: 'green', type: capturetype, url: path });
            }

            // alert('path extracted is the'+path);
        }



        
        //  alert('in cmp'+Ext.getCmp('capturelist').getStore().getId());
    },

    init:function()
    {

        // var store=Ext.getStore('myStoreID');
        // alert('got store'+store);

            // body...
        // }

        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        // function gotFS(fs) {
        //     // var fail = failCB('getFile');
        //     alert('got the file system');//+fs.name+'ffffff'+fs.root.name );
        //     fs.root.getFile('/mnt/sdcard/DCIM/Camera/', {create: true, exclusive: true},
        //                     gotFileEntry, fail);

        //       // alert( "Got the file system: "+fs.name +"<br/>" +
        //       //                      "root entry name is "+fs.root.name + "<p/>")   ;
        // }

        // function gotFileEntry(fileEntry) {
        //     alert('fileEntry'+fileEntry);

        //      // alert( "Got the file system: "+fileEntry.toURL() +"<br/>"); 
        // }

        // function fail(error)
        // {
        //     alert('faield'+error.code);
        // }


          // var url='file:/mnt/sdcard/DCIM/Camera/1396632561749.jpg';
          // var name = url.substring(url.lastIndexOf('/')+1);

          // alert('url'+url);
          // alert('parentname'+name);

          // var parentEntry = new DirectoryEntry(name, url);

          // alert(parentEntry.toUrl());
       
    },



    changeIconOnButtonTap: function(button, e, eOpts)
    {
        // alert(button.getItemId());
        if (button.getIconCls()==='icon-microphone')
        {
            //default view
            button.setIconCls('icon-dribbble');
            this.getListView().setHidden(false);
             this.getGridView().setHidden(true);
            // alert('in here');
        }
        else{
           button.setIconCls('icon-microphone');
           //show grid view
           this.getGridView().setHidden(false);
            this.getListView().setHidden(true);
        }

        // alert(this.getGridView().getItemId());
    },

    onGridSelect: function(grid, index, target, record, e, eOpts)
    {
        alert('item tapped');
    },

    fun:function()
    {
        alert('this is fun');
    }


});
