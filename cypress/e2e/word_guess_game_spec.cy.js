describe('GFG Word Guess Game', () => {
    before(() => {
      cy.fixture('user').then((user) => {
        cy.wrap(user).as('user');
      });
    });
  
    beforeEach(() => {
      cy.wrap({ username: 'testuser', password: 'testpassword' }).as('user');
      cy.clearLocalStorage();
      cy.get('@user').then((user) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/api/register',
          body: {
            username: user.username,
            password: user.password,
          },
          failOnStatusCode: false,
        });
      });
    });
  
    it('should register a new user', () => {
      cy.get('@user').then((user) => {
        cy.visit('/register');
        cy.get('input[type="text"]').type(user.username);
        cy.get('input[type="password"]').first().type(user.password);
        cy.get('input[type="password"]').last().type(user.password);
        cy.contains('button', 'Register').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Registration successful');
        });
      });
    });
  
    it('should not register with existing user', () => {
      cy.get('@user').then((user) => {
        cy.visit('/register');
        cy.get('input[type="text"]').type(user.username);
        cy.get('input[type="password"]').first().type(user.password);
        cy.get('input[type="password"]').last().type(user.password);
        cy.contains('button', 'Register').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('User already exists');
        });
      });
    });
  
    it('should display error for empty registration fields', () => {
      cy.visit('/register');
      cy.contains('button', 'Register').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please fill in all fields');
      });
    });
  
    it('should display error for empty login fields', () => {
      cy.visit('/');
      cy.contains('button', 'Login').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please fill in all fields');
      });
    });
  
    it('should login with registered user', () => {
      cy.get('@user').then((user) => {
        cy.visit('/');
        cy.get('input[type="text"]').type(user.username);
        cy.get('input[type="password"]').type(user.password);
        cy.contains('button', 'Login').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Login successful');
        });
      });
    });
  
    it('should navigate to Register page from Login page', () => {
      cy.visit('/');
      cy.contains('Register').click();
      cy.url().should('include', '/register');
      cy.contains('h2', 'Register').should('be.visible');
    });
  
    it('should navigate to Login page from Register page', () => {
      cy.visit('/register');
      cy.contains('Login').click();
      cy.url().should('include', '/');
      cy.contains('h2', 'Login').should('be.visible');
    });
  
    it('should navigate to Login page when Logout button is clicked', () => {
      cy.get('@user').then((user) => {
        cy.visit('/');
        cy.get('input[type="text"]').type(user.username);
        cy.get('input[type="password"]').type(user.password);
        cy.contains('button', 'Login').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Login successful');
        });
  
        cy.visit('/game');
        cy.get('.logout-button').click();
        cy.url().should('include', '/');
        cy.contains('h2', 'Login').should('be.visible');
      });
    });
  
 
  
    it('should display the game title', () => {
      cy.visit('/game');
      cy.contains('h1', 'Word Guess Game').should('be.visible');
    });
  
    it('should start with default difficulty and timer', () => {
      cy.visit('/game');
      cy.get('select').should('have.value', 'easy');
      cy.contains('Time Left: 60 seconds').should('be.visible');
    });
  
    it('should change difficulty and reset timer', () => {
      cy.visit('/game');
      cy.get('select').select('medium');
      cy.contains('Time Left: 45 seconds').should('be.visible');
  
      cy.get('select').select('hard');
      cy.contains('Time Left: 30 seconds').should('be.visible');
  
      cy.get('select').select('easy');
      cy.contains('Time Left: 60 seconds').should('be.visible');
    });
  
    it('should guess a correct letter', () => {
      cy.visit('/game');
      cy.window().then((win) => {
        win.__cypressWordData = win.__cypressWordData || { word: 'WORLD' };
        const word = win.__cypressWordData.word;
        const correctLetter = word[0];
        cy.contains('.letter-button', correctLetter).click();
        cy.get('.letter').first().should('have.text', correctLetter);
      });
    });
  
    it('should guess a wrong letter and show message after 3 wrong guesses', () => {
      cy.visit('/game');
      const wrongLetters = ['Q', 'X', 'Z'];
      wrongLetters.forEach((letter) => {
        cy.contains('.letter-button', letter).click();
      });
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Game Over! You made too many wrong guesses.');
      });
    });
  
    it('should use a hint', () => {
      cy.visit('/game');
      cy.get('.hint-button').click();
      cy.get('.hints').should('contain.text', 'Hints Remaining: 2');
    });
  
    it('should remove a guessed letter', () => {
      cy.visit('/game');
      cy.window().then((win) => {
        win.__cypressWordData = win.__cypressWordData || { word: 'WORLD' };
        const word = win.__cypressWordData.word;
        const correctLetter = word[0];
        cy.contains('.letter-button', correctLetter).click();
        cy.get('.letter').first().should('have.text', correctLetter);
  
        cy.get('.remove-button').click();
        cy.get('.letter').first().should('be.empty');
      });
    });
  
    it('should guess the word correctly', () => {
      cy.visit('/game');
      cy.window().then((win) => {
        win.__cypressWordData = win.__cypressWordData || { word: 'WORLD' };
        const word = win.__cypressWordData.word;
        word.split('').forEach((letter) => {
          cy.contains('.letter-button', letter).click();
        });
        cy.get('.message').should('contain.text', 'You have guessed the word correctly!');
      });
    });
  
    it('should restart the game', () => {
      cy.visit('/game');
      cy.get('.restart-button').click();
      cy.get('.letter').each(($el) => {
        cy.wrap($el).should('be.empty');
      });
      cy.get('.hints').should('contain.text', 'Hints Remaining: 3');
      cy.contains('Time Left: 60 seconds').should('be.visible');
    });
  
 
  
    // New tests
    it('should disable hint button when no hints are remaining', () => {
      cy.visit('/game');
      cy.get('.hint-button').click();
      cy.get('.hint-button').click();
      cy.get('.hint-button').click(); // Use all hints
      cy.get('.hint-button').should('be.disabled');
    });
  
    it('should reset game correctly after wrong guess limit', () => {
      cy.visit('/game');
      const wrongLetters = ['Q', 'X', 'Z'];
      wrongLetters.forEach((letter) => {
        cy.contains('.letter-button', letter).click();
      });
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Game Over! You made too many wrong guesses.');
      });
      cy.get('.restart-button').click();
      cy.get('.letter').each(($el) => {
        cy.wrap($el).should('be.empty');
      });
      cy.get('.hints').should('contain.text', 'Hints Remaining: 3');
      cy.contains('Time Left: 60 seconds').should('be.visible');
    });
  
 
  
    it('should show error message on incorrect guess', () => {
      cy.visit('/game');
      const wrongLetters = ['Q', 'X', 'Z'];
      wrongLetters.forEach((letter) => {
        cy.contains('.letter-button', letter).click();
      });
      cy.get('.message').should('contain.text', 'You made a Wrong Guess!. Try again!');
    });
  

  
    it('should disable remove button if no letters guessed', () => {
      cy.visit('/game');
      cy.get('.remove-button').should('be.disabled');
    });
  
    it('should change difficulty settings accordingly', () => {
      cy.visit('/game');
      cy.get('select').select('medium');
      cy.contains('Time Left: 45 seconds').should('be.visible');
  
      cy.get('select').select('hard');
      cy.contains('Time Left: 30 seconds').should('be.visible');
  
      cy.get('select').select('easy');
      cy.contains('Time Left: 60 seconds').should('be.visible');
    });
  });
  