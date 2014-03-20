Ext.define('testStoryApp.controller.controller', {
    extend: 'Ext.app.Controller',
 
    config: {
        control: {
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
        
        var popup=Ext.widget('notePopup');
        popup.showBy(arg);
    },

    launch: function()
    {
        var store=Ext.getCmp('capturelist').getStore();
        
        var path;

        window.localStorage.clear();

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

        //store is not initialized in here
    }


});
