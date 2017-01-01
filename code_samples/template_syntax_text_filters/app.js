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
            msg: "test"
        },
        filters: {
            capitalize: function (value) {
                if (!value){
                    return '';
                } else {
                    value = value.toString();
                    value = value.split(" ");
                    var x; l = value.length;
                    for(x = 0; x < l; x++) {
                        value[x] = value[x].charAt(0).toUpperCase() + value[x].slice(1);
                    }
                    value = value.join(" ");
                    return value;    
                } 
            }
          }
    });  
    

}