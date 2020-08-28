const { _, $ } = Cypress


describe("test number 1", function(){
    it('doesnt do anything helpful', function(){
        expect(true).to.equal(true);
        expect(false).to.equal(false);
    })
})

describe("go to page", function(){

    it("should navigate to the local host home page, and click a navigation link", function() {
        cy.visit("http://localhost:8080");

        cy.get('#toDoLink').click();

        cy.url().should('include','/todo');
    })
})

describe("check that everything exists", function (){

    it ("should have a new todo list & add input & button",function(){
        
        cy.get('#todo').contains("todo List");
        cy.get('#todo').contains('Add a new todo -');
        cy.get("#todoListWrapper").contains('My To-Do List');
        cy.get('#formWrapper').get("button");
        cy.get('#formWrapper').get("input");

    }); 

});

describe('add new to do item',function() {
    it("should be able to type into input and submit form and add new line item",function(){

        expect(cy.get(".todoItemWrapper").should('have.length', 1))

        cy.get('#formWrapper').get(".text-input").type('adding a new to do!').should('have.value', 'adding a new to do!').trigger('change');

        cy.get('#formWrapper').get("button").click();

        expect(cy.get(".todoItemWrapper").should('have.length', 2))
        expect(cy.get(".text-input").should('have.value', ''))
    });
});

describe('complete a todo', function () {
    it("should be able to complete", function(){  
        expect(cy.get('.completed').should("have.length",0))
        cy.get('.todoItemWrapper > div > div > input').click({ multiple: true });
        expect(cy.get('.completed').should("have.length",2))
    });
});

describe('delete a todo', function () {
    it("should be able to delete", function(){
        expect(cy.get('.completed').should("have.length",2))
        expect(cy.get(".todoItemWrapper").should('have.length', 2))
        cy.get('.remove:first').click();
        expect(cy.get('.completed').should("have.length",1))
        cy.get('.remove:first').click({force:true});
        expect(cy.get('.completed').should("have.length",0))
    });
});

describe("add back the default todo", function() {
    it("should automatically add the default todo back to the list",function(){
        expect(cy.get(".todoItemWrapper").should('have.length', 1));
        expect(cy.get(".todoItemWrapper").contains('make some more todos'))
        expect(cy.get('.completed').should("have.length",0))
    })
})