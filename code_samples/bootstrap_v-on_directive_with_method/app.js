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
            upvotes: 0
        },
        methods: {
            upvote: function() {
                this.upvotes++;
            }
        }
    });             
    
}