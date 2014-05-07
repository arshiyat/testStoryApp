Ext.define('testStoryApp.view.MainContainer', {
    extend: 'Ext.Container',
    xtype: 'mainview',
  
    requires: [
        'Ext.TitleBar',
       
        ],

    config: {
    scroll:'none',

        items: [
            {

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Media Space',
                    itemId:'mediaBar',


                    items: [
                    {
                        iconCls: 'icon-vcard',
                        itemId:'settingButton',
                        align: 'left'
                    },
                    {
                        iconCls: 'icon-cog',
                        itemId:'userProfileButton',
                        align: 'right'
                    }
                    ]
                }

            },
            {
               xtype: 'toolbar',
               itemId:'widgets',
               layout: {
                            type: 'hbox',                           
                            align: 'strech',                            
                        },
                        height: '100',
                        // width:'100',
            // docked: 'top',
                items: [
                
                    { xtype:'button',flex:1,itemId:'camera',iconCls:'icon-camera'},
                    { xtype:'button',flex:1,itemId:'video',iconCls:'icon-camera2'},
                    { xtype:'button',flex:1,itemId:'note',iconCls: 'compose'},
                    { xtype:'button',flex:1,itemId:'audio',iconCls:'icon-microphone'},
                    { xtype:'button',flex:1,itemId:'changeView',iconCls: 'icon-dribbble'},
                    { xtype:'button',flex:1,itemId:'sort',iconCls: 'icon-menu' },
                   
                ]
            },
            {
                xtype:'panel',
                html: '<center>Capture list Empty</center>',
                // align:'center',
                hidden:true,
                itemId:'emptyPanel',
                height:'100%',
                  padding: 100
            },
            
            {
            
                xtype:'list',
                itemId:'capturelist',
                height: '100%',
                scrollable: 'vertical',
                store:'myStoreID',
                itemTpl:'<h1>{type} </h1> <img src="{url}"></img>',
                itemCls:'capture-entry',
                hidden: false

               
            },
            
            {
                xtype: 'dataview',
                height: '100%',
                itemId:'gridView',
                styleHtmlContent: true,
                width: '100%',
                layout: {
                    type: 'fit'
                },
                inline: {
                    wrap: true
                },
                itemCls: 'capture-entry1',
                itemTpl: [
                    '<img src="{url}"></img>'
                  
                ],
                store: 'myStoreID',
                hidden: true
                
            }
            
        ]
    }
});
