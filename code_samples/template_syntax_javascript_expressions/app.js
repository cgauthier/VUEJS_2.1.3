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
            d: 4,
            m: 7,
            y: 1966
        }
    });  
    

}