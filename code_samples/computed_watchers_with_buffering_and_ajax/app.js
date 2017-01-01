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
            answer: "",
            question: "",
            src: ""
        },
        watch: {
            question: function(newQ) {
                this.answer = "";
                if(newQ.length) {
                    this.answer = "Waiting for you to stop typing...";    
                }
                this.getAnswer();
            }
        },
        methods: {
            clearField: function() {
                this.question = "";                
            },
            getAnswer: _.debounce(function() {
                var vm = this;
                
                if(this.question.length) {
                    if(this.question.indexOf("?") === -1) {
                        vm.answer = "Questions usually contains a question mark. :)";
                        vm.src = "";
                        return;
                    }
                    vm.answer = "Thinking ....";
                    axios.get('https://yesno.wtf/api').then(function(response) {
                        vm.answer = _.capitalize(response.data.answer);
                        vm.src = response.data.image;
                        
                    }).catch(function(error) {
                        vm.answer = 'Error! Could not reach the API. ' + error;
                        vm.src = "";
                    });
                } else {
                    vm.answer = "";
                    vm.src = "";
                    return;
                }
                
            }, 500)
        }
    });  

}