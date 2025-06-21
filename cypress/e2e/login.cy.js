describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
           });

   it('Правильный логин и правильный пароль', function () { // позитивный кейс
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');

    })
       it('Восстановление пароля', function () { // позитивный кейс
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('german@dolnikov.ru');
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

      it('Правильный логин и НЕправильный пароль', function () { // негативный кейс
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio2'); // НЕправильный пароль
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
      it('НЕправильный логин и правильный пароль', function () { // негативный кейс
        cy.get('#mail').type('ivan@dolnikov.ru'); // НЕправильный логин
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

      it('Валидация на наличие @', function () { // негативный кейс
        cy.get('#mail').type('germandolnikov.ru'); // логин без @
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        //Разработчик допустил баг в этом месте и не реализовал пункт #2 из требований.
        //Тест должен упасть — и это ок (то есть мы этим тестом поймали баг, который допустил разработчик
    })
 })

// запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome
// не мог запустить команду выше, терминал писал "Need to install ...", требовал обновить Cypress до последней версии v14...,
// загуглил, gemini посоветовал в package.json было "cypress": "^12.7.0" - но это не помогло
// помог copilot
// Иногда помогает удалить node_modules и package-lock.json:
// rm -rf node_modules package-lock.json
// npm cache clean --force
// npm install

// git add . // проиндексировать все файлы
// git commit -m "имя_коммита" // добавить комментарий для фиксации
// git push // загрузить изменения с ноута в github


