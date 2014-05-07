Ext.define('testStoryApp.store.captureStore', {
	extend: 'Ext.data.Store',
	
    
    config:
    {
     model: 'testStoryApp.model.captureModel',
     storeId: 'myStoreID',
        // data:[
	       //  {
	       //  	title:'title1',
	       //  	url:'url1',
	       //  	type:'type1',
	       //  	srcUrl:'srcUrl'
	       //  }, 
	       //  {
	       //  	title:'title2',
	       //  	url:'url2',
	       //  	type:'type2',
	       //  	srcUrl:'srcUrl2'
	       //  }
        // ],
        proxy: {
    		type: 'localstorage',
			}
        }
});