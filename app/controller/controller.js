Ext.define('testStoryApp.controller.controller', {
    extend: 'Ext.app.Controller',

   
    config: {

        store       :        null,
        record      :        null,
        media       :        null,
        mediaStatus :        null, 
        sheetpanel  :        null,
        fe          :        null,
        
        refs: {
            
            main:'main',
            mainView:'mainview',
            settingsviewPanel:'setttingview',
            filterviewPanel:'filterview',

            camera: 'mainview > #widgets > #camera' ,
            video: 'mainview > #widgets > #video' ,
            note: 'mainview > #widgets > #note' ,
            audio: 'mainview > #widgets > #audio',
            view: 'mainview > #widgets > #changeView',
            sortButton:'mainview > #widgets > #sort',
            settingsButton: 'mainview > #mediaBar > #settingButton',
            gridViewButton:'mainview > #gridView ',
            listView:'mainview > #capturelist',
            emptyPanel: 'mainview > #emptyPanel',

            settingsBackButton: 'setttingview >#settingsBar >#SettingsBackbutton',
            filterBackButton:'filterview >#filterToolbar >#filterBackbutton',
            // filterForm:'filterview >#filterForm',
            settingslist:'setttingview >#settingslist',

            
            componentview:'view',
            cmp:'view >#htmlCmp',
            textcmp:'view >#note',
            savebutton:'view >#save',
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

            sortButton:{
                tap:'onSort'
            },

            backbutton:{
                tap:'onBackButton'
            },

            view:{
                tap:'changeIconOnButtonTap'
            },

            // gridViewButton:{
            //     itemtap:'onGridSelect'
            // },

            listView:{
                itemtap:'itemTapped'
            },

            settingslist:{
                itemtap:'settinglistTapped'
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
            },

            textcmp:{
                keyup:'onTextChange'
            },

            savebutton:{
                tap:'onNoteSave'
            },

            settingsBackButton:{
                tap: 'onSettingsBackButton'
            },

            filterBackButton:{
                tap: 'onFilterBackButton'
            }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },

    onCamera:function()
    {
        var me=this;

        try{
 
        var captureSuccess = function(mediaFiles) {
             
            var path = mediaFiles[0].fullPath;

            // alert('captured path'+path);


            if(path.length>0)
            {
                // var store=Ext.getStore('myStoreID');

                emptyPanel.hide();

                var sampleDate = new Date();
                // alert('today date is '+sampleDate);
                // var formated = Ext.Date.format(sampleDate,'d-m-Y');          
                me.getStore().add({ title: 'green', type: 'Image', url: path, srcUrl: path,dateStamp: sampleDate });
                me.getStore().sync();

                alert(this.getStore().getCount());

                // me.moveAndRenameFile(path);
               

            }

        };
      
        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        }
        catch(E)
        {
            alert('caught exception '+E.toString());
        }

    },


    onVideo:function()
    {
        var me=this;
        try{
        var captureSuccess = function(mediaFiles) {
        
            var path = mediaFiles[0].fullPath;

            // alert('captured path'+path);

            if(path.length>0)
            {
                emptyPanel.hide();


                var sampleDate = new Date();
                // var formated = Ext.Date.format(sampleDate,'d-m-Y');
                me.getStore().add({ title: 'blue', type: 'Video', url: path ,srcUrl: path, dateStamp: sampleDate});
                me.getStore().sync();

            }
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
        }
        catch(E)
        {
            alert('caught exception '+E.toString());

        }

    },

    onNote: function(button, e, eOpts)
    {
        try{
        var me=this;
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
                        
                        var d = new Date();

                        fileName='Note-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.txt';

                        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);
                        // var path="resources/icons/notes.png"
                    }

                    function gotFileEntry(fileEntry) {
                        me.setFe(fileEntry);
                       
                        fileEntry.createWriter(gotFileWriter, fail);
                    }

                    function gotFileWriter(writer) {
                        
                        //get the text from the text box
                        var note=Ext.getCmp('note').getValue();
                        writer.write(note);

                        var path="resources/icons/notes.png"

                        // var store=Ext.getStore('myStoreID');

                        var sampleDate = new Date();
                        // var formated = Ext.Date.format(sampleDate,'d-m-Y');

                        me.getStore().add({ title: 'white', type: 'Note', url: path ,srcUrl: fileName,dateStamp: sampleDate });

                        me.getStore().sync();
                        me.getEmptyPanel().setHidden(true);


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
    }catch(E)
    {
        alert('caught exception '+E.toString());
    }
    },

    onAudio: function()
    {

        try{
           var emptyPanel=this.getEmptyPanel();
           var me=this;

            var captureSuccess = function(mediaFiles) {
                
                var path = mediaFiles[0].fullPath;

                // alert('captured path is '+path);

                emptyPanel.hide();

                var sampleDate = new Date();
                // var formated = Ext.Date.format(sampleDate,'d-m-Y');

                me.getStore().add({ title: 'yellow', type: 'Audio', url: 'resources/icons/audio.jpeg', srcUrl: path, dateStamp: sampleDate });
                me.getStore().sync();

            };

            // capture error callback
            var captureError = function(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            };

            // start audio capture
            navigator.device.capture.captureAudio(captureSuccess, captureError);
        }
        catch(E)
        {
            alert('caught exception '+E.toString()); 
        }
    },
 
    launch: function()
    {
        try{
            this.setStore(Ext.getStore('myStoreID')); 
            // this.getStore().load();
            // this.getStore().removeAll();

            // this.getStore().sync();

            // this.getStore().load();

            // alert('count is '+this.getStore().getCount());
            this.getStore().load();

            if(this.getStore().getCount()==0)
            {
                this.getEmptyPanel().show();
            }

            this.sortFlag=false;
        }catch(E)
        {
            alert('Exception caught '+E.toString());
        }
    },

    init:function()
    {

    },


    // changeIconOnButtonTap: function(button, e, eOpts)
    // {
    //     try{
    //         if (button.getIconCls()==='icon-microphone')
    //         {
    //             //default view
    //             button.setIconCls('icon-dribbble');
    //             this.getListView().show();
    //             this.getGridView().hide();
    //         }
    //         else{
    //            button.setIconCls('icon-microphone');
    //            //show grid view
    //            this.getGridView().show();
    //             this.getListView().hide();
    //         }
    //     }catch(E)
    //     {
    //         alert('Exception caught '+E.toString());
    //     }


    // },

    // onGridSelect: function(dataview, index, target, record, e, eOpts)
    // {
    //     alert('item tapped');
    // },

    itemTapped:function(list, index, target, record, e, eOpts)
    {
        try{
            var record=this.getStore().getAt(index);
            var me=this;
            this.setRecord(record);

            var type=this.getRecord().get('type');
            var url=this.getRecord().get('srcUrl');
            // url=url.substring(5);

            this.getButtonCmp().hide();
            this.getTextcmp().hide();
            this.getTextcmp().setValue('');
            this.getCmp().show();
            this.getSavebutton().hide();

            var htmlstr;

            // alert('url i s'+url);

            if(type==='Image'){
                htmlstr='<img width="100%" height="200" src="'+url+'" />'; 
                this.getCmp().setHtml(htmlstr);
                this.getMetaData(url);

            }
            else if(type==='Video'){

                htmlstr='<video id="video" controls preload="none" width="100%" height="200"> <source src="'+url+'" type="video/mp4"/></video>';
                // htmlstr='<video id="video" controls width="100%" height="200"> <source src="/mnt/sdcard/DCIM/Camera/video-2014-04-23-16-16-46.mp4"  type="video/mp4"  /></video>';

                // var video = document.getElementById('video');
                // alert("video" +video);
                 // video.play();
                this.getCmp().setHtml(htmlstr);
                this.getMetaData(url);


            }
           else if(type==='Audio')
           {

               htmlstr='<img src="resources/icons/audio.jpeg" align="middle" width="50%" height="30%" />';
               //video can be played using the media phongap api.
               //we have to have the buttons on the component to play stop and pause.
               // str='<button type="button" >Click Me!</button>";
               // this.getCmp().setHidden(true);
               this.getButtonCmp().show();

               var media=new Media(url, function(){'success'}, function(e){alert('Cannot play the audio '+e.message)});
               this.setMedia(media);
               this.getCmp().setHtml(htmlstr);
               this.getMetaData(url);

           }
           else if(type==='Note')
            {
                //Hide the html component and display the text area compnent
                this.getCmp().hide();
                this.getTextcmp().show();
                //display the text area component

                this.showNote();
            }

            this.getMain().setActiveItem(1);
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }
    },

    showNote: function()
    {
        try{
            var main=this.getMain();
            var comp=this.getTextcmp();
            var me=this;
            var compCaptureDetails=this.getCapturedetails();
            var filename;


            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            var filesrc=this.getRecord().get('srcUrl');

            function gotFS(fileSystem) {
                fileSystem.root.getFile(filesrc, null, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                filename=fileEntry.name;

                me.setFe(fileEntry);
                fileEntry.file(gotFile, fail);
                fileEntry.getMetadata(success, failed);
             }

            function failed(error) {
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

            function gotFile(file){
                readAsText(file);
            }

            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    comp.setValue(evt.target.result);
                    main.setActiveItem(1);
                };

                reader.readAsText(file);
            }
            function fail(error) {
                alert('failed with error'+error.code);
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onTextChange:function()
    {
        //when the user changes the note then show the save button
        this.getSavebutton().show();
    },

    onStop:function()
    {
        //get the play back value to know the status of the audio being played.
        if(this.getMedia())
        {
            if(this.getMediaStatus()==2 || this.getMediaStatus()==3)//running or paused
            {
                this.getMedia().stop();
            }
        }
    },

    onPlay:function()
    {
        try{
            alert('media status is '+this.getMediaStatus());
            alert('media object is '+this.getMedia());
            if(this.getMedia())
            {   
                if(this.getMediaStatus()==2)//running
                {
                    this.getMedia().pause();
                    this.getPlay().setText('Play');   
                }
                else if(this.getMediaStatus()==3 || this.getMediaStatus()==1 || this.getMediaStatus()==4)//paused
                {
                    this.getMedia().play();
                    this.getPlay().setText('Pause');   

                }
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }
       
    },

    onBackButton:function()
    {
        try{
            if(this.getMedia() && (this.getMediaStatus()==2 || this.getMediaStatus()==3))//playing or paused 
            {
                this.getMedia().stop();
            }
            this.getMain().setActiveItem(0);
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }
    },

    onDeleteButton:function()
    {
        // //look for the file and delete it. Refresh the list
       try{
            var me=this;

            if(this.getFe()!=null)
            {
                this.getFe().remove(success, fail);
            }

            function success(entry) {
                alert("Media Removal succeeded");

                me.getStore().remove(me.getRecord());

                me.getStore().sync();

                me.getMain().setActiveItem(0);
            }

            function fail(error) {
                alert('Error removing file: ' + error.code);
            }
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }


    },

    getMetaData:function(url)
    {
        try{
            //url is the url of the file whose metadata needs to be found.
            var compCaptureDetails=this.getCapturedetails();
            var filename;

            var me=this;

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
                me.setFe(fileEntry);
                filename=fileEntry.name;
                // alert('got file entry');
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
        }catch(E)
        {
            alert('caught exception '+E.toString());
        }   

    },

    //this method is yet to use
    moveAndRenameFile: function(url)
    {
        //create the directory if it does not exists on today's data.
        var dirName='MediaStore/'+d.getFullYear()+d.getMonth()+d.getDate();
        var de,path='file://'+url;

        var fileNameIndex=url.lastIndexOf('/');
        var fileName=url.substring(fileNameIndex);
        alert('dir name is '+dirName);
        alert('fileName name is '+fileName);
        alert('File type is is '+fileName.subString(fileName.lastIndexOf('.')));
    },

    //Saving the note when changed
    onNoteSave:function()
    {
        try{
            var me=this;
            this.getFe().createWriter(gotFileWriter, fail);
            // alert('save the text on the file');

            function gotFileWriter(writer) {
                            
                //get the text from the text box
                var note=me.getTextcmp().getValue();

                writer.write(note);
            }

            function fail(error) {
                alert('failed with error '+error.code);
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onSettingButton:function(button, e, eOpts)
    {
        try{
        
            if(this.getSettingsviewPanel()==null)
            {
                this.settingsviewPanel=Ext.create('testStoryApp.view.SettingsView');
            }

            this.getMain().hide();
            this.getSettingsviewPanel().show();
        }
        catch(E)
        {
            alert('Exception caught in setting back button'+E.toString());
        }


    },

    onSort:function()
    {
        try{
            if(this.sortFlag)
            {
                this.getStore().setGroupDir('DESC').sort();
                this.sortFlag=false;
            }
            else
            {
                this.getStore().setGroupDir('ASC').sort();
                this.sortFlag=true;
            }

            this.getStore().sort();
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onSettingsBackButton: function(button, e, eOpts)
    {
        this.getSettingsviewPanel().hide();
        this.getMain().show();
    },

    onFilterBackButton: function(button, e, eOpts)
    {
        try{
            this.getSettingsviewPanel().show();
            this.getFilterviewPanel().hide();

            var values=this.getFilterviewPanel().getValues();
           
            var image=((values.img) ? "yes" : "no"),
            video=((values.video) ? "yes" : "no"),
            audio=((values.audio) ? "yes" : "no"),
            note=((values.note) ? "yes" : "no");

            // apply the changes done on the model which refreshes the capture list
            var store=this.getStore();

            store.clearFilter();

            store.filterBy(function(record){
                if((record.get('type')=='Image' && image=='yes')|| (record.get('type')=='Video' && video=='yes') || (record.get('type')=='Audio' && audio=='yes') ||(record.get('type')=='Note' && note=='yes'))
                {
                    return true;
                }
                else
                {
                    return false;
                }

            });
        }catch(E)
        {
            alert('Exception caught '+E.toString());
        }
    },


    settinglistTapped:function(list, index, target, record, e, eOpts)
    {
        try{

            if(!this.filterviewPanel)
            {
                this.filterviewPanel=Ext.create('testStoryApp.view.FilterView');
            }
             this.filterviewPanel.show();
        }
        catch(E)
        {
            alert('Exception caught'+E.toString());
        }
    }

});


//chk how to close the floating panel on cancel or focus change.
