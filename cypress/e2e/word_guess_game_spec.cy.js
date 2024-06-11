describe('Word Guess Game', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Adjust the URL based on your local setup
    });
  
    it('should display the game correctly', () => {
      cy.get('h1').should('contain', 'Word Guess Game');
      cy.get('.word-container').should('exist');
      cy.get('.word-description').should('exist');
      cy.get('.restart-button').should('exist');
      cy.get('.remove-button').should('exist');
      cy.get('.hint-button').should('exist');
      cy.get('.guess-button').should('exist');
    });
  
    it('should allow selecting letters', () => {
      cy.get('.letter-button').first().click();
      cy.get('.letter-button').first().should('be.disabled');
    });
  
    it('should handle hints correctly', () => {
      cy.get('.hint-button').click();
      cy.get('.hints').should('contain', 'Hints Remaining: 2');
    });
  
    it('should handle removing letters correctly', () => {
      cy.get('.letter-button').first().click();
      cy.get('.remove-button').click();
      cy.get('.letter-button').first().should('not.be.disabled');
    });
  
    it('should display win message on correct guess', () => {
      const correctWord = 'HELLO'; // Replace with the word that gets selected randomly
      correctWord.split('').forEach(letter => {
        cy.get(`.letter-button:contains(${letter})`).click();
      });
      cy.get('.guess-button').click();
      cy.get('.message').should('contain', 'You have guessed the word correctly!');
    });
  
    it('should display lose message on incorrect guess', () => {
      const incorrectGuesses = ['Z', 'X', 'Q'];
      incorrectGuesses.forEach(letter => {
        cy.get(`.letter-button:contains(${letter})`).click();
      });
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Game Over! You made too many wrong guesses.');
      });
    });
  
    it('should restart the game', () => {
      cy.get('.letter-button').first().click();
      cy.get('.restart-button').click();
      cy.get('.letter-button').first().should('not.be.disabled');
      cy.get('.hints').should('contain', 'Hints Remaining: 3');
    });
  });
  