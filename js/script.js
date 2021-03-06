(function(){
    //All Code start when DOM tree has been loaded.
    document.addEventListener('DOMContentLoaded', function() {
    
    //Function generate radnom 10 length string
        function randomString() {   
            var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
            var str = '';
            for ( i = 0; i < 10; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        } 
        //gen Template
        function generateTemplate(name, data, basicElement) {
            var template = document.getElementById(name).innerHTML;
            var element = document.createElement(basicElement || 'div'); // Create random div
    
            Mustache.parse(template);
            element.innerHTML = Mustache.render(template, data)
    
            return element;
        }

        // Column class
        function Column(name) {
            var self = this;
    
            this.id = randomString();
            this.name = name;
            this.element = generateTemplate('column-template', { name: this.name, id: this.id });
    
            // Delete or add kolumn
            this.element.querySelector('.column').addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                  self.removeColumn();
                }                
                if (event.target.classList.contains('add-card')) {                    
                    validatePropmtAndAddObj(self, "Enter the name of the card", addCardCall);                                    
                }
            });
        }  

        document.querySelector('#board .create-column').addEventListener('click', function() {             
             validatePropmtAndAddObj(null, 'Enter a column name', addColumnCall );           
        });

        function validatePropmtAndAddObj (self, message, callback) {                                  
            var name = prompt(message);  
            if (name != null && name != isNaN && name != '') {                            
                callback(name, self);
            }
        }
        
        function addCardCall(name, self) {            
            self.addCard(new Card(name));  
        }

        function addColumnCall(name) {            
            var column = new Column(name); 
            board.addColumn(column);  
        }
        //-------This function run prompt, validate input and create new object (Column or Card).
        /*
        function validatePropmtAndAddObj (message, self) {   
            var name = prompt(message);  
            if (name != null && name != isNaN && name != '') {                            
                if (event.target.classList.contains('add-card')) {                    
                    self.addCard(new Card(name));   
                } else {
                    var column = new Column(name); 
                    board.addColumn(column);   
                }
            }
        }
        */
        
        // Methods for Column Class
        Column.prototype = {
            addCard: function(card) {
              this.element.querySelector('ul').appendChild(card.element);
            },
            removeColumn: function() {
              this.element.parentNode.removeChild(this.element);
            }
        };
    
        //Card class 
        function Card(description) {
            var self = this;
          
            this.id = randomString();
            this.description = description;
            this.element = generateTemplate('card-template', { description: this.description }, 'li');
    
            //delete Card
            this.element.querySelector('.card').addEventListener('click', function (event) {
                event.stopPropagation();
              
                if (event.target.classList.contains('btn-delete')) {
                  self.removeCard();
                }
              });
          }    
          // delete card method
          Card.prototype = {
            removeCard: function() {
                this.element.parentNode.removeChild(this.element);
            }
        }
    
        // Create board Object    
        var board = {
            name: 'Kanban Board',
            element: document.querySelector('#board .column-container'),
            addColumn: function(column) {
              this.element.appendChild(column.element);
              initSortable(column.id); 
            },
            
        };
    
        // Drag & Drop function for sort columns, cards.
        function initSortable(id) {
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
                group: 'kanban-cards',
                sort: true
            });
        }

        // Add function: sortable columns        
        Sortable.create(board.element, {
			group: 'kanban-columns',
			sort: true
        });        
    
        // Create All Kanban objects    
        // CREATE COLUMNS
        
        var ideaColumn = new Column('Ideas');
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');
        
        // ADDING COLUMNS TO THE BOARD
        board.addColumn(ideaColumn);
        board.addColumn(todoColumn);
        board.addColumn(doingColumn);
        board.addColumn(doneColumn);
        
        // CREATING CARDS
        var card1 = new Card('New task');
        var card2 = new Card('Create kanban boards');
        var card3 = new Card('Your Ideas');
        var card4 = new Card('Can you drop me and drag!');
        
        // ADDING CARDS TO COLUMNS
        ideaColumn.addCard(card3);
        ideaColumn.addCard(card4);
        todoColumn.addCard(card1);
        doingColumn.addCard(card2);

        
        
    });
    
    })();
    
    