import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json";
import * as recovery_page from "../locators/recovery_password_page.json";

describe('Проверка авторизации', function () {

  beforeEach('Начало теста', function () {
    cy.visit('/');
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
  });

  afterEach('Конец теста', function () {
    cy.get(result_page.close).should('be.visible');
  });

  it('Правильный логин и правильный пароль', function () { // позитивный кейс
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type('iLoveqastudio1');
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Авторизация прошла успешно');
  })

  it('Правильный логин и НЕправильный пароль', function () { // негативный кейс
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type('iLoveqastudio2'); // НЕправильный пароль
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Такого логина или пароля нет');
  })

  it('НЕправильный логин и правильный пароль', function () { // негативный кейс
    cy.get(main_page.email).type('ivan@dolnikov.ru'); // НЕправильный логин
    cy.get(main_page.password).type('iLoveqastudio1');
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Такого логина или пароля нет');
  })

  it('Валидация на наличие @', function () { // негативный кейс
    cy.get(main_page.email).type('germandolnikov.ru'); // логин без @
    cy.get(main_page.password).type('iLoveqastudio1');
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');
  })

  it('Проверка на приведение к строчным буквам в логине', function () {
    cy.get(main_page.email).type('German@Dolnikov.ru');
    cy.get(main_page.password).type('iLoveqastudio1');
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Авторизация прошла успешно');
    //Разработчик допустил баг в этом месте и не реализовал пункт #2 из требований.
    //Тест должен упасть — и это ок (то есть мы этим тестом поймали баг, который допустил разработчик
  })

  it('Восстановление пароля', function () { // позитивный кейс
    cy.get(main_page.fogot_pass_btn).click();
    cy.get(recovery_page.email).type(data.login);
    cy.get(recovery_page.send_button).click();
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
  })
})

// запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome

// npx cypress open // запустить cypress
// npx cypress run // запустить прогон автотестов из терминала

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
