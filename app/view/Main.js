Ext.define('testStoryApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
  
    config: {
        layout:'card',
    
        items: [
            {

                xtype: 'mainview'
            },
            {
                xtype:'view'
                 // html: "First Item"
            }
            
        ]
    }
});
