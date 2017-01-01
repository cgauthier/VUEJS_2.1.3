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
            msg: "",
            mylist: []
        },
        filters: {
            capitalize: function (value) {
                if (!value){
                    return '';
                } else {
                    return value.charAt(0).toUpperCase() + value.slice(1);
                } 
            },
            capitalizeLast: function (value) {
                if (!value){
                    return '';
                } else {
                    var lastChar = value.charAt(value.length - 1).toUpperCase();
                    value = value.split("");
                    value.splice(value.length - 1, 1, lastChar);
                    return value.join("");
                } 
            },
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
                        text: arr[x]
                    });    
                }
            }
        }
    }); 
    

}