Ext.define('testStoryApp.view.noteView', {
    extend: 'Ext.Panel',
    alias: 'widget.notePopup',
 
    config: {
        height: '50%',
        // html: 'I am Panel Popup',
        itemId: 'notePopup',
        left: '5%',
        padding: 10,
        top: '0%',
        width: '50%',
        hideOnMaskTap: true,
        modal: true,
    
    items: [
            {
                xtype: 'textareafield',
                id:'note',
                label: 'Note',
                maxRows: 2,
                name: 'bio'
                
            },
            
            {
                xtype: 'textfield',
                label: 'Note',
                name: 'fileName'
            },
            {
                xtype: "button",
                text: "Save Note",
                flex:1,
                handler: function() {

                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);



                    function gotFS(fileSystem) {
                        
                          fileSystem.root.getFile('readNote.txt', {create: true, exclusive: false}, gotFileEntry, fail);

                          var store=Ext.getCmp('capturelist').getStore();

                            store.add({ title: 'white', type: 'Note', url: 'path' });

                            Ext.getCmp('capturelist').refresh();

                          //get the file for reading  
                          // fileSystem.root.getFile("readNote.txt", null, gotReaderFileEntry, fail);

                          // alert('before gotReaderFileEntry method');

                          // function gotReaderFileEntry(fileEntry) {
                          //       fileEntry.file(gotFile, fail);



                          //   }

                          //   alert('afet gotReaderFileEntry method');

                          // var reader = new FileReader();

                          // reader.onloadend = function(evt) {
                          //          alert("Read as text");
                          //           alert(evt.target.result);
                          //           alert('after the result is displayed');
                          //   };

                          //    function gotFile(file){
                          //       alert('in got file');
                          //       (reader.readAsText(file));
                          //       alert('after');

                          //   };
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

   
                }
            }
        ]
    }
});