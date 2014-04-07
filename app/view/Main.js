Ext.define('testStoryApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
  
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
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


                    items: [
                    {
                        iconCls: 'icon-vcard',
                        
                        align: 'left'
                    },
                    {
                        iconCls: 'icon-cog',
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
                    { flex:1,itemId:'changeView',iconCls: 'icon-dribbble'},
                    { flex:1,itemId:'sort',iconCls: 'icon-menu' },
                   
                ]
            },
            
            {
            
                xtype:'list',
                itemId:'capturelist',
                height: '100%',
                scrollable: 'vertical',
                store:'myStoreID',
                itemTpl:'<h1>{type} </h1> <img src="{url}"></img>',
                itemCls:'capture-entry',
                hidden: false,

                listeners:{
                      itemtap:function(list, index, target, record, e, eOpts){
                            // if(!this.panel)
                            // {
                            //     this.panel=new Ext.create()
                                 alert('open nav view');
                            // }
                            // this.
                            }
                }
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
                hidden: true,
                listeners:{
                      itemtap:function(dataview, index, target, record, e, eOpts){
                                 alert('open nav view');
                            }
                }
            }
        ]
    }
});
