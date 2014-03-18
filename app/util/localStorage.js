Ext.define('DemoStory.util.localStorage', {
       singleton : true,
 
        config : {
            baseUrl : 'http://sureshdotariya.blogspot.com/',
            imageUrl: 'http://sureshdotariya.blogspot.com/image.png',
            url : null,
            playing:false,
            media : null
        },
 
        setMedia: function(media) {
            this.media=media;
        },

        getMedia:function()
        {
            return this.media;
        },

        setFlag:function(flag)
        {
            this.playing=flag;
        },

        isPlaying:function()
        {
            return this.playing;
        },

        setUrl:function(url)
        {
            this.url=url;
        },

        getUrl:function()
        {
            return this.url;
        }
});