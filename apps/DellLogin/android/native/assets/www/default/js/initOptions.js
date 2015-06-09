
/* JavaScript content from js/initOptions.js in folder common */
var wlInitOptions = {
    connectOnStartup : true
};

WLJSX.bind(window, "load", function() {
    WL.Client.init(wlInitOptions);
});
