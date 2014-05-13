Ext.define('testStoryApp.controller.controller', {
    extend: 'Ext.app.Controller',

   
    config: {

        store      :        null,
        record     :        null,
        media       :       null,
        sheetpanel:null,
        
        refs: {
            
            main:'main',
            mainView:'mainview',

            camera: 'mainview > #widgets > #camera' ,
            video: 'mainview > #widgets > #video' ,
            note: 'mainview > #widgets > #note' ,
            audio: 'mainview > #widgets > #audio',
            view: 'mainview > #widgets > #changeView',
            settingsButton: 'mainview > #mediaBar >#settingButton',
            gridView:'mainview > #gridView ',
            listView:'mainview > #capturelist',
            emptyPanel: 'mainview > #emptyPanel',
            
            componentview:'view',
            cmp:'view >#htmlCmp',
            capturedetails:'view >#capturedetails',
            buttonCmp:'view >#buttonPanel',
            stop:'view >#buttonPanel >#stop',
            play:'view >#buttonPanel >#play',
            backbutton:'view >#titlebarInfo >#backButton',
            deletebutton: 'view >#titlebarInfo >#deleteButton',
           
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

            backbutton:{
                tap:'onBackButton'
            },

            view:{
                tap:'changeIconOnButtonTap'
            },

            // gridView:{
            //     itemtouchend:'onGridSelect'
            // },

            listView:{
                itemtap:'itemTapped'
            },

            stop:{
                tap:'onStop'
            },

            play:{
                tap:'onPlay'
            },

            deletebutton:{
                tap:'onDeleteButton'
            },
            settingsButton:{
                tap:'onSettingButton'
            }

        }

        
    },

    onCamera:function()
    {
        var me=this;
 
        var captureSuccess = function(mediaFiles) {
             
            var path = mediaFiles[0].fullPath;

            alert('captured path'+path);


            if(path.length>0)
            {
                //local store update
                // window.localStorage.setItem(((window.localStorage.length+1).toString()),'I:'+path);

                // var store=Ext.getStore('myStoreID');

                emptyPanel.hide();
                // path='..'+path;
                // store.add({ title: 'green', type: 'Image', url: path, srcUrl: path });
                // store.sync();

                try{
                    //move the file and rename it and then save the value on the store.
                me.moveAndRenameFile(path,'Image');
                }
                catch(Err)
                {
                    alert(Err.toString());
                }

            }

        };
      
        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
    },


    onVideo:function()
    {
        var captureSuccess = function(mediaFiles) {
        
            var path = mediaFiles[0].fullPath;

            alert('captured path'+path);

            if(path.length>0)
            {
                emptyPanel.hide();

                var store=Ext.getStore('myStoreID');

                // window.localStorage.setItem(((window.localStorage.length+1).toString()),'V:'+path);

                store.add({ title: 'blue', type: 'Video', url: path ,srcUrl: path});
                store.sync();

            }
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

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
                    var fe,fileName;

                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

                     function gotFS(fileSystem) {
                        
                        // alert('got the handerl' +fileSys.root.fullPath);

                        var d = new Date();

                        alert(d.toDateString());
                        fileName='Note-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.txt';
                        alert('Note-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.txt');

                        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);

                        //var store=Ext.getCmp('capturelist').getStore();
                        // var store=Ext.getStore('myStoreID');

                        // var path="resources/icons/notes.png"

                        // window.localStorage.setItem(((window.localStorage.length+1).toString()),'N:'+path);

                        // alert('geeting the stored element'+window.localStorage.getItem(((window.localStorage.length+1).toString())));

                        // Ext.getCmp('capturelist').refresh();
                    }

                    function gotFileEntry(fileEntry) {
                        
                        fe=fileEntry;
                       
                        alert('url is'+fileEntry.fullPath);//+fileEntry.toUrl());

                        fileEntry.createWriter(gotFileWriter, fail);
                        

                    }

                    function gotFileWriter(writer) {
                        
                        //get the text from the text box
                        var note=Ext.getCmp('note').getValue();
                        alert(note);
                        writer.write(note);

                        var path="resources/icons/notes.png"

                        var store=Ext.getStore('myStoreID');

                        fileName='..//'+fileName;

                        alert('file name stored '+fileName);

                        store.add({ title: 'white', type: 'Note', url: path ,srcUrl: fileName});

                        store.sync();

                        // this.getEmptyPanel().setHidden(true);

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
    this.sheetpanel=button.sheet;
    },

    onAudio: function()
    {

       var emptyPanel=this.getEmptyPanel();

        var captureSuccess = function(mediaFiles) {
            
            var path = mediaFiles[0].fullPath;

            alert('captured path is '+path);

            emptyPanel.hide();

            var store=Ext.getStore('myStoreID');

            // window.localStorage.setItem(((window.localStorage.length+1).toString()),'A:'+path);

            store.add({ title: 'yellow', type: 'Audio', url: 'resources/icons/audio.jpeg', srcUrl: path });
            store.sync();

            //code for renaming the audio file but renaming the audio file is not playing the audio
        //     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            
        //     function gotFS(fileSystem) {
        //         fs=fileSystem;
        //         alert('fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail)');
        //         alert('path in gotFS'+path);
        //         fileSystem.root.getFile(path.substring(5), null, gotFileEntry, fail);

                
        //     };

        //     function gotFileEntry(fileEntry) {
        //         fe=fileEntry;
               
        //         alert('in file Entry full path'+fe.fullPath);
               
        //         fileEntry.getParent(success,fail);
          
        //     };

        //     function success(parent)
        //     {
        //         alert('in success');
        //         var d=new Date();
        //         dataStr='Voice-'+d.getFullYear()+d.getMonth()+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds()+'.3ga';
        //         alert('dataStr'+dataStr);
        //         alert('fileEntryobj'+fe.name+'-'+ fe.fullPath+',,,,,'+parent.name);
        //         fe.moveTo(parent,'Voice%2014',moveSuccess,fail);



        //         alert(parent.name);
                
        //     } ;

        //     function fail(error)
        //     {
        //         alert('failed');
        //     };

        // //----------------------------renamed file
        //     function moveSuccess(fileEntry){

        //         alert('in moveSuccess'+path);
        //         alert(path.substring(5));
        //         alert(path.lastIndexOf('/'));
        //         var n=parseInt(path.lastIndexOf('/'))+1;
        //         alert(path.substring(5,n));

        //         var url=path.substring(5,n);

        //         // fileSystem.root.getFile('/mnt/sdcard/Sounds/Voice%2014040564565.3ga', null, function(fe){alert('got file entry');}, fail);
               
        //         // if(path.length>0 )
        //         // {
               
        //         //     var store=Ext.getStore('myStoreID');

        //         //     alert('in store url'+url+dataStr);

        //         //     window.localStorage.setItem(((window.localStorage.length+1).toString()),'A:'+url+dataStr);

        //         //     store.add({ title: 'yellow', type: 'audio', url: path });

        //         //     Ext.getCmp('capturelist').refresh();
        //         // }
        //     }

           
            
        };

        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start audio capture
        navigator.device.capture.captureAudio(captureSuccess, captureError);

       
        
    },
 
    launch: function()
    {

        this.setStore(Ext.getStore('myStoreID')); 
        this.getStore().load();

        
        this.getStore().removeAll();

        this.getStore().sync();

        this.getStore().load();


        alert('count is '+this.getStore().getCount());


        this.getStore().load();

        if(this.getStore().getCount()==0)
        {
            this.getEmptyPanel().show();
        }
    },

    init:function()
    {

    },



    changeIconOnButtonTap: function(button, e, eOpts)
    {
        if (button.getIconCls()==='icon-microphone')
        {
            //default view
            button.setIconCls('icon-dribbble');
            this.getListView().show();
            this.getGridView().hide();
        }
        else{
           button.setIconCls('icon-microphone');
           //show grid view
           this.getGridView().show();
            this.getListView().hide();
        }

    },

    onGridSelect: function(grid, index, target, record, e, eOpts)
    {
        alert('item tapped');
    },

    itemTapped:function(list, index, target, record, e, eOpts)
    {
        var record=this.getStore().getAt(index);
        this.setRecord(record);

        var type=this.getRecord().get('type');
        var url=this.getRecord().get('srcUrl');
        // url=url.substring(5);

        this.getButtonCmp().hide();

        var htmlstr;

        alert('url i s'+url);

        if(type==='Image'){
            htmlstr='<img width="100%" height="200" src="'+url+'" />'; 
        }
        else if(type==='Video'){

            htmlstr='<video id="video" controls preload="none" width="100%" height="200"> <source src="'+url+'" type="video/mp4"/></video>';
            // htmlstr='<video id="video" controls width="100%" height="200"> <source src="/mnt/sdcard/DCIM/Camera/video-2014-04-23-16-16-46.mp4"  type="video/mp4"  /></video>';

            // var video = document.getElementById('video');
            // alert("video" +video);
             // video.play();

        }
       else if(type==='Audio')
       {

           htmlstr='<img src="resources/icons/audio.jpeg" width="100%" height="50%" />';
           //video can be played using the media phongap api.
           //we have to have the buttons on the component to play stop and pause.
           // str='<button type="button" >Click Me!</button>";
           // this.getCmp().setHidden(true);
           this.getButtonCmp().show();
           var media=new Media(url, function(){'success'}, function(e){alert('Cannot play the audio '+e.message)});
           this.setMedia(media);
       }
       else if(type==='Note')
        {

            this.showNote();
        }


        this.getCmp().setHtml(htmlstr);
       
        // alert(this.getCmp().getHtml());

        this.getMetaData(url);

        this.getMain().setActiveItem(1);

        

    },

    showNote: function()
    {
        var main=this.getMain();
        var comp=this.getCmp();

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        var filesrc=this.getRecord().get('srcUrl');

        function gotFS(fileSystem) {
            fileSystem.root.getFile(filesrc, null, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
         }

        function gotFile(file){
            readAsText(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                
                comp.setHtml(evt.target.result);
                main.setActiveItem(1);
            };

            reader.readAsText(file);
        }
        function fail(error) {
            alert('failed with error'+error.code);
        }
    },

    onStop:function()
    {

        //get the play back value to know the status of the audio being played.
        if(this.getMedia())
        {
            this.getMedia().stop();
        }
    },

    onPlay:function()
    {
        if(this.getMedia())
        {   
            // if(this.getMedia().isPlaying())
            {
                // alert('text is '+this.getPlay().getText());
                
                if(this.getPlay().getText()=="Play")
                {
                    this.getMedia().play();
                    this.getPlay().setText('Pause');
                }
                else
                {
                    this.getMedia().pause();
                    this.getPlay().setText('Play');   
                }
            }
            // else
            // {
            //     this.getMedia().play();
            //     this.getPlay().setText('Pause');
            // }
        }
       
    },

    onBackButton:function()
    {
        //before changing the view check if any updation done

        // alert('in back button');
       
        // this.getMedia().release();
        this.getMain().setActiveItem(0);

    },

    onDeleteButton:function()
    {
        // //look for the file and delete it. Refresh the list
       
        var record=this.getRecord();
        var path=record.get('srcUrl');
        
        // alert('path to delete'+path);
        var store=this.getStore();
        var main=this.getMain();

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            alert('fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail)');
            fileSystem.root.getFile(path, null, gotFileEntry, fail);
        };


        function gotFileEntry(fileEntry) {
           
           alert('in file Entry'+fileEntry.name);
            // window.resolveLocalFileSystemURI("file:/mnt/sdcard/Sounds/Voice%20015.3ga", onResolveSuccess, fail);

            //play the audio file

           fileEntry.remove(success,fail);

            
        };
         function fail(error) {
             navigator.notification.alert('Filed to delete with Error code '+error.code, null, 'Delete');
        };

        function success()
        {
            
            navigator.notification.alert('Media Deleted ', null, 'Delete');
          
            store.remove(record);
            
            store.sync();

            main.setActiveItem(0);

        }   

    },

    getMetaData:function(url)
    {
        //url is the url of the file whose metadata needs to be found.
        var compCaptureDetails=this.getCapturedetails();
        var filename;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            // window.resolveLocalFileSystemURI(url, gotImageURI, fail);
            // fileSystem.root.getFile('file://var/mobile/Applications/663F14F8-67B0-4143-8363-DBDC54107A85/tmp/photo_005.jpg', null, gotFileEntry, fail);
            // fileSystem.root.getFile(url, null, gotFileEntry, fail);
            window.resolveLocalFileSystemURI("file://"+url, gotFileEntry, fail);

        };

        // function gotImageURI (fileEntry) {
        //     alert('file entry in got image uri');
        //     fileEntry.getMetadata(success,fail);
        // }

        function gotFileEntry(fileEntry) {
            filename=fileEntry.name;
            alert('got file entry');
           fileEntry.getMetadata(success, fail);
        };

        function fail(error) {
            alert('Failed to get the metadata with error'+error.code);
            compCaptureDetails.setHtml('Captured Details unavailable');
             // navigator.notification.alert('Filed to get metadata with Error code '+error.code, null, 'Metadata');
        };

        function success(metadata)
        {
            var htmlStr='<p>File name ::'+filename+'</p>';
            htmlStr=htmlStr+ '<p>Modified Date is ::'+metadata.modificationTime+'</p>';
            compCaptureDetails.setHtml(htmlStr);
        }   

    },

    moveAndRenameFile: function(url,type)
    {
        //create the directory if it does not exists on today's data.
        var d = new Date();
        var dirName='MediaStore-'+d.getFullYear()+d.getMonth()+d.getDate();
        var de,path='file://'+url;

        var fileNameIndex=url.lastIndexOf('/');
        var fileName=url.substring(fileNameIndex);
       
        var fileType=fileName.substring(fileName.lastIndexOf('.'));
        var newFileName;

        var me=this;

        if(type=='Image')
        {
            newFileName='Image-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+fileType;
        }
        else if(type=='Video')
        {

        }
        else if(type=='Note')
        {

        }
        else (type=='Audio')
        {

        }

          //get hold of the file system.
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        // window.resolveLocalFileSystemURI(path, onResolvseSuccess, fail);


        function gotFS(fileSystem) {
            alert('in FS with dirname '+dirName);
            try{
            fileSystem.root.getDirectory(dirName, {create: true, exclusive: false}, onGetDirectoryWin, fail);
            }
            catch(error)
            {
                alert('error is '+error.toString());
            }
        };

        function onGetDirectoryWin(dirEntry)
        {
            de=dirEntry;
            alert('in onGetDirectoryWin - '+de.name);

             window.resolveLocalFileSystemURI(path, onResolveSuccess, fail);
        }

         function onResolveSuccess(fileEntry) {
            console.log(fileEntry.name);
            alert('in onResolveSuccess - '+fileEntry.toURL());
            fileEntry.moveTo(de,newFileName,success,fail);
                    
        }

        function success(entry) {
            console.log("New Path: " + entry.fullPath);
            alert('in success - '+entry.toURL());

            // var filenam='/'+dirName+'/'+entry.name;

            // alert('new file name to search '+filenam);
             // fileSystem.root.getFile(filenam, null, onGotFile, fail);


            me.getStore().add({ title: 'green', type: 'Image', url: entry.toURL(), srcUrl: (entry.fullPath)});
            me.getStore().sync();

        }

        // function onGotFile(entry)
        // {
        //     alert(' got the file after moving with file path '+entry.toURL());
        // }

         function fail(error) {
            alert('Failed with error code '+error.code);
        };

    },

    onSettingButton:function()
    {
        alert('on settings button');
    }

});
