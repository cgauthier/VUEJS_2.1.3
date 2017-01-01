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
            a: 1,
            msg: "is less than 50",
            constant: 50
        }
    });             
    
    app.$watch('a', function(newVal, oldVal) {
        var c = this.constant;
        if(newVal < c) {
            this.msg = "less than 50"
        } else {
            if(newVal == c) {
                this.msg = "equal to 50"
            } else {
                this.msg = "greater than 50"
            }
        }
    });
    
}