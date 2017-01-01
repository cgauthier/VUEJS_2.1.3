var scope = {
    window: window,
    Vue: Vue
};

window.onload = launch.bind(scope);

function launch() {
    var V = this.Vue;
    var window = this.window;
    var app = new V({
        el: '#app',
        data: {
            seen: true
        }
    });             
    
    var btn1 = document.getElementById("showme");
    btn1.addEventListener("click", function() {
        this.seen = true;
    }.bind(app));
    
    var btn2 = document.getElementById("hideme");
    btn2.addEventListener("click", function() {
        this.seen = false;
    }.bind(app));
    
}