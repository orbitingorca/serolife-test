const recipe = {
  name: "Taramasalata",
  method: ["Mix with Mortar and pestle"],
  ingredients: [
    {name: "Tarama", quantity: "1"},
    {name: "bread crumbs", quantity: "1000"},
    {name: "lemon juice", quantity: "1"},
  ]
}

describe("Recipe tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  })
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
    cy.get('.button').contains('Add New Recipe').click();
    cy.get('input[name=name]').type(recipe.name);
    cy.get('textarea[name=method').type(recipe.method[0]);
    cy.get('input[name="ingredients.0.name"]').type(recipe.ingredients[0].name);
    cy.get('input[name="ingredients.0.quantity"]').type(recipe.ingredients[0].quantity);
    cy.get('button').contains('Add Ingredient').click();
    cy.get('input[name="ingredients.1.name"]').type(recipe.ingredients[1].name);
    cy.get('input[name="ingredients.1.quantity"]').type(recipe.ingredients[1].quantity);
    cy.get('button').contains('Add Ingredient').click();
    cy.get('input[name="ingredients.2.name"]').type(recipe.ingredients[2].name);
    cy.get('input[name="ingredients.2.quantity"]').type(recipe.ingredients[2].quantity);
    cy.intercept('POST', '/recipes', {
      statusCode: 200,
      body: { },
    }).as('addRecipe');
    cy.get('input.submit-button').click();
    cy.get('button').contains('Close').click();
    cy.get('@addRecipe').then((data: any) => {
      const body = data.request.body;
      expect(body).to.deep.equal(recipe);
    });
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
        cy.get('input[type=text]').type('Tara');
        cy.intercept('GET', '/recipes', {
          statusCode: 200,
          body: [recipe.name, 'Curry'],
        }).as('searchRecipe');
        cy.get('input[type=submit]').click();
        cy.get('@searchRecipe').then((data: any) => {
          expect(data).to.not.empty;
        });
        cy.intercept('GET', '/recipes/' + recipe.name, {
          statusCode: 200,
          body: recipe
        }).as('getRecipe');
        cy.get('button').contains(recipe.name).click();
        cy.get('@getRecipe');
        recipe.ingredients.forEach((i, index) => {
          cy.get('.ingredients').contains(recipe.ingredients[index].name);
        });
        cy.get('.method').contains(recipe.method[0]);
  });

  xit(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    expect(true).to.eq(false);
  });
});
