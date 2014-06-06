Ext.define('testStoryApp.view.View', {
    extend: 'Ext.Panel',

    xtype: 'view',

    config:{

    	fullscreen: true,
    	layout: 'vbox',
    	items:[
    	
        {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Information',
            itemId:'titlebarInfo',

            items: [
            {
                xtype:'button',
                // iconCls: 'icon-vcard',
                text:'back',
                itemId:'backButton',
                align: 'left'
            },
            {
                xtype:'spacer'
            },

            {
                xtype:'button',
                iconCls: 'trash',
                iconMask:true,
                // text:'delete',
                itemId:'deleteButton',
                align: 'right'
            }
            ]
        },
    	{
            xtype:'component',
            itemId: 'htmlCmp',
            html:'testing',
            flex:4,
            align:'center',
            height:'100%',
            width:'100%',
            hidden:false
        },
        {
            xtype: 'textareafield',
            itemId:'note',
            label: 'Note',
            maxRows: 10,
            flex:4,
            hidden:true,
       
        },
       
        {
            xtype:'component',
    		html:'Capture details',
    		flex:2,
            itemId:'capturedetails'
    	},
        {
                xtype:'button',
                text:'Save',
                itemId:'save',
                flex:1,
                hidden:true

        },
        {
            xtype:'toolbar',
            itemId:'buttonPanel',
            layout:'hbox',
            hidden:true,
            docked:'bottom',
            ui:'light',
            items:[
            {
                xtype:'button',
                text:'play',
                itemId:'play',
                flex:1

            },
            {
                xtype:'button',
                text:'Stop',
                itemId:'stop',
                flex:1
            }
            
            ]
        }
    
        ]

    }
 });