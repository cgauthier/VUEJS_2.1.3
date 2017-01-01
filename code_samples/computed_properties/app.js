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
            msg: ""
        },
        computed: {
            reverseMsg: function(value) {
                return this.msg.split('').reverse().join("");
            }
        }
    });  
    
    app.$watch("msg", function(newV, oldV) {
        var arr;
        var x, l;
        this.mylist = [];
        if(newV.length) {
            arr = newV.split(" ");
            l = arr.length;
            for(x = 0; x < l; x++) {
                if(arr[x].length) {
                    this.mylist.push({
                        text: arr[x],
                        idx: x
                    });    
                }
            }
        }
    }); 
    

}