var scope = {
    window: window,
    Vue: Vue
};

window.onload = launch.bind(scope);

var data = {
    food: [{
        dish: "Pizza",
        vote: 0
    }, {
        dish: "Hamburger",
        vote: 0
    }, {
        dish: "Hot Dog",
        vote: 0
    }, {
        dish: "French Fries",
        vote: 0
    }, {
        dish: "Onion Rings",
        vote: 0
    }, {
        dish: "Corn Dog",
        vote: 0
    }],
    popular: "",
    voteStatus: "",
    voteGroup: "",
    updateVote: 0
};

function launch() {
    var V = this.Vue;
    var window = this.window;
    
    var app = new V({
        el: '#app',
        data: function() {
            return data;
        },
        created: function() {
            setEventListener.call(this);           
        },
        mounted: function() {
            setPopular.call(this, "");
        },
        computed: {
            sortedFood: function() {
                var data = this.food;
                return data.sort(function(a, b) {
                    if(a.vote == b.vote) {
                        return (a.dish < b.dish) ? -1 : (a.dish > b.dish) ? 1: 0;
                    } else {
                        return (a.vote < b.vote) ? 1 : (a.vote > b.vote) ? -1: 0;
                    }
                });
            }
        },
        methods: {
            reset: function() {
                var x, l = this.food.length;
                for(x = 0; x < l; x++) {
                    this.food[x].vote = 0;
                }
                this.voteStatus = "";
                this.updateVote = 0;
            },
            upvote: function(item) {
                item.vote++;
                updateVote.call(this);                
            }
        }
    });
 
    app.$watch('updateVote', function(newVal, oldVal) {
        setPopular.call(this, this.voteStatus);
    });
    
    function setPopular(voteStatus) {
        if(voteStatus.length == 0) {
            this.popular = "No Votes Yet! Stay Tuned!";
            return;
        }
        if(voteStatus === "tie") {
            this.popular = "It's a tie!";
            return;
        }
        if(voteStatus === "partial") {
            this.popular = "It's a tie between: " + this.voteGroup;
            return;
        }
        if(voteStatus === "leading") {
            this.popular = "The Leading Food Vote is for: " + this.voteGroup;
        }
    }
    
    function updateVote() {
        var x, max = 0, maxItem, l = this.food.length, allEqual = true, groupIsEqual = false, group = [], votes = [];
                
        for(x = 0; x < l; x++) {
           if(this.food[x].vote > max) {
               max = this.food[x].vote;
               maxItem = this.food[x];
           }
        }
        
        for(x = 0; x < l; x++) {
            if(max !== this.food[x].vote) {
                allEqual = false;
            }
        }
        
        if(allEqual !== true) {
            for(x = 0; x < l; x++) {
                if(this.food[x].vote == max) {
                    group.push(this.food[x].dish);
                }
            }
        }

        if(group.length > 1) {
            groupIsEqual = true;
            group = group.sort();
        }
        
        if(allEqual === true) {
            if(max !== 0) {
                this.voteStatus = "tie";                        
            } else {
                this.voteStatus = "";
            }
        } else {
            if(groupIsEqual === true) {
                this.voteGroup = group.join(", ");
                this.voteStatus = "partial";
            } else {
                this.voteGroup = maxItem.dish;
                this.voteStatus = "leading";
            }
        }
        
        this.updateVote++;       
    }
 
    function setEventListener() {
        window.addEventListener('keyup', function(e) {
            if(e.keyCode == 46) {
                this.reset();
            }         
        }.bind(this));
    }
    
}