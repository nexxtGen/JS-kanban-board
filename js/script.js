
//Code strat when DOM tree has been loaded.
document.addEventListener('DOMContentLoader', function() {

//Function generate radnom 10 length string
    function randomString() {
        var str = '';
        for ( var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str; 
    }
    





});