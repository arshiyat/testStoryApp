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
                label: 'Note',
                maxRows: 4,
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
                   alert('save the file  and push it to the list as saved');
                }
            }
        ]
    }
});