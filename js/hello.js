// Saying hello to backbone!

(function($){

    // ------- Let's make a model

    var Item = Backbone.Model.extend({
        // set some defaults...
        defaults: {
            thing1: "Hello",
            thing2: "world",
            myBool: true
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
            $(this.el).html('<span>'+this.model.get('thing1')+' '+this.model.get('thing2')+'</span>');
            return this;
        }
    });

    var ListView = Backbone.View.extend({
        // el, events, render, addItem, appendItem, oh my!
        // Whatchyou talkin' bout, Willis?
        el: $('body'), // attaches to existing element
        events: {
            'click button#add': 'addItem'
        },
        // Let us begin...
        initialize: function(){
            // ? what does the underscore do?
            _.bindAll(this, 'render', 'addItem', 'appendItem');

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render(); // Ta da! A self rendering view, ladies and gentlemen
        },
        render: function(){
            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function(){
            this.counter++;
            var item = new Item();
            item.set({
                thing2: "universe " + this.counter
            });
            this.collection.add(item);
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