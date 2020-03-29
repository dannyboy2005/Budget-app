// Budget Controller module. IIFE
var budgetController = (function() {
  // Expense function contructor
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Income function constructor
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type.length > 0]) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // Pushes the new item to the data object
      data.allItems[type].push(newItem);
      // Returns the new element
      return newItem;
    }
  };
})();

// UI Controller module. IIFE
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDomstrings: function() {
      return DOMstrings;
    }
  };
})();

// Controller module. IIFE
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDomstrings();
    // Event listeners for button click and enter keypress
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get field input data
    input = UICtrl.getInput();
    // 2. Add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to UI
    // 4. Calculate the budget
    // 5. Display budget on the UI
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
