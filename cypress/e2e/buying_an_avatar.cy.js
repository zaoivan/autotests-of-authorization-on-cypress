describe('Проверка покупки нового аватара', function () {                 // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
         cy.wait(1000);
         cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
         cy.wait(1000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click();  // нажимаем кнопку Смена аватара
         cy.wait(1000);
         cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
         cy.get('.card_date').type('1226');                           // вводим срок действия карты
         cy.get('.card_csv').type('125');                             // вводим CVV карты
         cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
         cy.wait(1000);
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
         cy.wait(1000);
         cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
         cy.get('.payment_status_top_title').contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
     });
 });
