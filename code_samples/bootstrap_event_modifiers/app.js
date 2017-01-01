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
            b: 2,
            c: null,
            operator: "+"
        },
        methods: {
            calculate: function(e) {
                switch(this.operator) {
                    case "+":
                        this.c = this.a + this.b;
                    break;
                    
                    case "-":
                        this.c = this.a - this.b; 
                    break;
                    
                    case "/": 
                        this.c = this.a / this.b;
                    break;
                    
                    case "*":
                        this.c = this.a * this.b;
                    break;
                }
            }
        }
    });             
    
}