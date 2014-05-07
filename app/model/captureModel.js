Ext.define('testStoryApp.model.captureModel', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'srcUrl', type:'string'},
            { name: 'metadata', type:'string'}
        ]
    }
});
