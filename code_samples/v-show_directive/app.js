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
            message: "",
            output: ""
        }
    });             
    
    var btn1 = document.getElementById("messageBtn");
    btn1.addEventListener("click", function() {
        this.output = this.message
    }.bind(app));
    
}