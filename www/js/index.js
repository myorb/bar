var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // demo the scan
        console.log('about to scan');
        try {
            var scanned = app.scan();
            console.log('scan triggered', scanned);
        } catch (e) {
            console.log('scan failed');
            console.log(JSON.stringify(e));
            console.log('that sucks... reloading in 10');
            setTimeout(function() {
                console.log('reloading now...');
                app.onDeviceReady();
            }, 10000);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    /**
* here is an example for scanning a barcode...
* obviously, your own JS logic <<here>>
*
* Note the require() method is called on window.cordova
* this is different than the readme!
*/
    scan: function() {
        console.log('scan(): init');
        // documentation said the syntax was this:
        // var scanner = window.PhoneGap.require("cordova/plugin/BarcodeScanner");
        // but playing with options, seems like it should be this:
        var scanner = window.cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
                );
    }
};