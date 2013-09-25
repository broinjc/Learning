// Saying hello to backbone!
// My first introduction to it...

(function($){

    // ------- Let's make a model

    var Item = Backbone.Model.extend({
        // set some defaults...
        defaults: {
            red: "#ff0000",
            green: "#00ff00",
            blue: "#0000ff"
        }
    });

    // ------- Let's make a collection of these Items

    var List = Backbone.Collection.extend({
        model: Item
    });

    // ------- Let's write a couple of views

    var ItemView = Backbone.View.extend({
        // Here we have the view's root tag in this.el. How marvelous!
        tagName: 'li',
        // Let us begin...
        initialize: function(){
            // All the guys who use "this" as the current object
            _.bindAll(this, 'render');
        },
        render: function(){
        	
            $(this.el).html('<span style="color:white;background:'+this.model.get('red')+';">'+this.model.get('red')+'</span>');
            return this;
        }
    });

    var ListView = Backbone.View.extend({
        // el, events, render, addItem, appendItem, oh my!
        // Whatchyou talkin' bout, Willis?
        el: $('#c'), // attaches to existing element
        events: {
            'click button#add': 'addItem'
        },
        // Let us begin...
        initialize: function(){
            // ? what does the underscore do?
            _.bindAll(this, 'render', 'addItem', 'appendItem');

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 100000;
            this.render(); // Ta da! A self rendering view, ladies and gentlemen
        },
        render: function(){
            var self = this;
            $(this.el).append("<button id='add'>Add a little color, why don't ya?</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function(){
        	var i;
        	for(i=0; i <= 3; i++){
	            this.counter += 111;
    	        var item = new Item();
        	    item.set({
            	    red: "#" + this.counter
      	      	});
        	    this.collection.add(item);
        	}
        },
        appendItem: function(item){
            var itemView = new ItemView({
                model: item
            });
            
            $('ul', this.el).append(itemView.render().el);
        }
    });
    var listView = new ListView();
})(jQuery);