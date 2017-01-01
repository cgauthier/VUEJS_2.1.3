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
            todos: [
                { text: "Learn Vue JS" },
                { text: "Learn AWS" },
                { text: "Build Awesome Stuff!" },
                { text: "Make tons of cash!" },
                { text: "Work from a Yacht!" }
            ]
        }
    });             
    
}