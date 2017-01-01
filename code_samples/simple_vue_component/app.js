var scope = {
    window: window,
    Vue: Vue
};

window.onload = launch.bind(scope);

function launch() {
    var V = this.Vue;
    var window = this.window;
    
    V.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text}}</li>'
    });
    
    var app = new V({
        el: '#app',
        data: {
            groceryList: [
                {text: "Broccoli"},
                {text: "Cheese"},
                {text: "Chicken"},
                {text: "Potatoes"},
                {text: "Butter"},
                {text: "Parsley"}
            ]
        }
    });             
    
}