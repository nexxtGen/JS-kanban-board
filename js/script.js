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
    
        //Function for generate mustache template from html code and add this to box (<div> etc).
        //--- name- template id in html code
        //--- data - dane podstawione do szablonu
        //--- basicElement - Element w który zostanie opakowany szablon. Potrzebny do wytworzenia drzewa DOM by mieć dostęp
        //do DOM Api ponieważ Mustache.js zwraca w funkcji render string'a z zawartością szablonu!
        
    
        function generateTemplate(name, data, basicElement) {
            var template = document.getElementById(name).innerHTML;
            var element = document.createElement(basicElement || 'div'); // Create random div
    
            Mustache.parse(template);
            element.innerHTML = Mustache.render(template, data)
    
            return element;
        }
    
        //Class name write with large letter!
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
                    var cardName = prompt("Enter the name of the card");
                    if (cardName != null && cardName != isNaN && cardName != '') {
                        self.addCard(new Card(cardName));                     
                    }                   
                }
            });
        }
    
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
        
          // Add listener to button. This create new column object in board.
        document.querySelector('#board .create-column').addEventListener('click', function() {
            var name = prompt('Enter a column name');      
            if (name != null && name != isNaN && name != '') {
                var column = new Column(name); 
                board.addColumn(column);                        
            } 
        });

        // Add function: sortable columns
        
        Sortable.create(board.element, {
			group: 'kanban-columns',
			sort: true
        });
        
    
        // Create All Kanban objects
    
        // CREATING COLUMNS
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
    
    