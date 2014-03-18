Ext.define('testStoryApp.view.captureList', {

    extend: 'Ext.List',
    xtype: 'captureList',

    config: {

        // title: 'Tweets',
        // iconCls: 'chat',
        // cls: 'tweets',
        id:'capturelist',
        // scrollable: false,

        // items: [
        //     {
        //         docked: 'top',
        //         xtype: 'titlebar'
        //     }
        // ],

        store: 'myStoreID',
        limit: 10,
        disableSelection: true,
        height:'100%',

        // plugins: [
        //     { type: 'listpaging' },
        //     { type: 'pullrefresh' }
        // ],

        itemTpl:'<h1>{type} </h1> <img src="{url}"></img>',
                itemCls:'capture-entry',
        // emptyText: '<p class="no-searches">No tweets found matching that search</p>',

        // itemTpl: Ext.create('Ext.XTemplate',
        //     '<img src="{profile_image_url}" />',
        //     '<div class="tweet">',
        //         '<span class="posted">{[this.posted(values.created_at)]}</span>',
        //         '<h2>{from_user}</h2>',
        //         '<p>{text}</p>',
        //     '</div>',
        //     {
        //         posted: function(date) {
        //             try {
        //                 var now = Math.ceil(Number(new Date()) / 1000),
        //                     dateTime = Math.ceil(Number(new Date(date)) / 1000),
        //                     diff = now - dateTime,
        //                     str;

        //                 if (diff < 60) {
        //                     return String(diff) + ' seconds ago';
        //                 } else if (diff < 3600) {
        //                     str = String(Math.ceil(diff / (60)));
        //                     return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
        //                 } else if (diff < 86400) {
        //                     str = String(Math.ceil(diff / (3600)));
        //                     return str + (str == "1" ? ' hour' : ' hours') + ' ago';
        //                 } else if (diff < 60 * 60 * 24 * 365) {
        //                     str = String(Math.ceil(diff / (60 * 60 * 24)));
        //                     return str + (str == "1" ? ' day' : ' days') + ' ago';
        //                 } else {
        //                     return Ext.Date.format(new Date(date), 'jS M \'y');
        //                 }
        //             } catch (e) {
        //                 return '';
        //             }
        //         }
        //     }
        // )
    }
});
