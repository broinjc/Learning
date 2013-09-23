// Model for todo
// --------------

var Todo = Backbone.Model.extend({
    // Default todo attribute values
    defaults: {
        title: '',
        completed: false,
        today: true
    }
});

// Instantiate the Todo Model with a title and the completed attribute

var myTodo = new Todo({
    title: 'Check the attributes property of the logged models in the console.'
});

// View for todo
// -------------

var TodoView = Backbone.View.extend({
    tagname: 'li',
    // Cache the template function for a single item
    todoTpl: _.template( $('#item-template').html() ),

    events: {
        'dblclick label':'edit',
        'keypress .edit':'updateOnEnter',
        'blur .edit':'close'
    },

    // Called when the view is first created
    initialize: function() {
        this.$el = $('#todo');            
    },

    render: function() {
        this.$el.html( this.todoTpl( this.model.toJSON() ) );
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {
        // Executed when todo label is double clicked
    },

    close: function() {
        // executed when todo loses focus
    },

    updateOnEnter: function( e ) {
        // executed on each keypress when in todo edit mode,
        // but we will wait for enter to get in action
    }
});

var todoView = new TodoView({model: myTodo});
