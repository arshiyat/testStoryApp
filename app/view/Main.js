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
                        iconCls: 'team',
                        align: 'left'
                    },
                    {
                        iconCls: 'more',
                        align: 'right'
                    }
                    ]
                }

            },
            {
               xtype: 'toolbar',
               id:'widgets',
               layout: {
                            type: 'hbox',                           
                            align: 'strech',                            
                        },
                        height: '100',
                        // width:'100',
            // docked: 'top',
                items: [
                
                    { xtype:'button',flex:1,id:'camera',iconCls:'headphones',//text:'camera',
                        listeners:{
                            tap:function()
                            {
                                // alert(this.parent.getId());
                                this.fireEvent('tapped',this);
                                // alert('tapped');
                            }
                        }
                    },
                    { xtype:'button',flex:1,id:'video',text:'Video',
                     listeners:{
                            tap:function()
                            {
                                // alert(this.parent.getId());
                                this.fireEvent('tapped',this);
                                // alert('tapped');
                            }
                        }
                    },
                    { xtype:'button',flex:1,id:'note',iconCls: 'compose',//text:'audio',
                     listeners:{
                            tap:function()
                            {
                                // alert(this.parent.getId());
                                this.fireEvent('tapped',this);
                                // alert('tapped');
                            }
                        }
                    },
                    { xtype:'button',flex:1,id:'audio',text:'note',
                     listeners:{
                            tap:function()
                            {   
                                // alert(this.parent.getId());
                                this.fireEvent('tapped',this);
                                // alert('tapped');
                            }
                        }
                    },

                    { flex:1,iconCls: 'add' },
                    { flex:1,iconCls: 'compose' },
                   
                ]
            },
            
            {
            
                xtype:'list',
                id:'capturelist',
                height: '100%',
                scroll: 'vertical',
                store:'myStoreID',
                itemTpl:'<h1>{type} </h1> <img src="{url}"></img>',
                itemCls:'capture-entry',
            }
        ]
    }
});
