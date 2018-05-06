"use strict";

const poEl = require('./objects/elements.json'),
    poConst = require('./objects/const.json'),
    hlLogin = require('./helpers/gmailLogin.js'),
    Q = require('q');

describe('Gmail messaging system test', () => {
    const EC = protractor.ExpectedConditions,
          waitTime = 5000;
    let isReady;

    let randomSubject = "Subject_" + Math.random().toString(36).slice(-5);
    console.log("randomSubject = " + randomSubject);
    browser.ignoreSynchronization = true;

   beforeAll((done) => {
        browser.get(poEl.url)
            .then(() => browser.driver.manage().window().maximize())
            .catch((err) => isReady = err)
            .finally(done);
    });

   it('should check page header', function(done) {
    if(isReady) return done();

    browser.wait(EC.visibilityOf($(poEl.txtHeader)), waitTime, 'wait for gmail app loads')
        .then(() => expect($(poEl.txtHeader).getText()).toBe(poConst.txtHeader))
        .catch((err) => isReady = err)
        .finally(done);

   });

   it('should check _err  incase of page is not opened', () => {
          expect(isReady).toBeFalsy();
   });

  it('should check successful message sending process', (done) => {
        if(isReady) return done();

        hlLogin.Login(poConst.Gmail1)
           .then(() => element(by.xpath(poEl.btnCompose)).click())
           .then(() => browser.wait(EC.visibilityOf($(poEl.messageTo)), waitTime, 'wait for message window visisbility'))
           .then(() => $(poEl.messageTo).sendKeys(poConst.Gmail2.user))
           .then(() => $(poEl.messageBody).click())
           .then(() => $(poEl.messageSubject).sendKeys(randomSubject))
           .then(() => $(poEl.messageBody).click())
           .then(() => $(poEl.messageBody).sendKeys(poConst.content))
           .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.btnSend))), waitTime, 'wait for send button visibility'))
           .then(() =>  element(by.xpath(poEl.btnSend)).click())
           .then(() => browser.wait(EC.invisibilityOf(element(by.xpath(poEl.btnSend))), waitTime, 'wait for message window invisibility'))
           .catch((err) => isReady = err)
           .finally(done);
         });

        it('should check _err in case of failed message sending process', () => {
             expect(isReady).toBeFalsy();
        });

        it('should check sent message', (done) => {
            if(isReady) return done();

            element(by.linkText(poEl.lnkSent)).click()
            .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.tbrow))), waitTime, 'wait for message list table visibility'))
            .then(() => element.all(by.xpath(poEl.tbrow)))
            .then((row) => row[0].$$('td').get(5).getText())
            .then((text) => expect(text).toContain(randomSubject))
            .catch((err) => isReady = err)
            .finally(done);
        });

        it('should logOut and switch to other account', (done) => {
            if(isReady) return done();

               hlLogin.Logout()
                .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.arrowSign))), waitTime, 'wait for login window visibility'))
                .then(() => element(by.xpath(poEl.arrowSign)).click())
                .then(() => browser.sleep(waitTime))
                .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.lnkUseAnother))), waitTime, 'wait for use another link visibility'))
                .then(() => element(by.xpath(poEl.lnkUseAnother)).click())
                .then(() => browser.wait(EC.visibilityOf($(poEl.txtEmail)), waitTime, 'wait for login page'))
                .catch((err) => isReady = err)
                .finally(done);
        });

        it('should check _err in case of failed logout', () => {
           expect(isReady).toBeFalsy();
        });

      it('should check Inbox message for second account', (done) => {
        if(isReady) return done();

        hlLogin.Login(poConst.Gmail2)
            .then(() => element.all(by.xpath(poEl.tblInbox)))
            .then((row) => row[0].$$('td').get(5).getText())
            .then((text) => expect(text).toContain(randomSubject))
            .catch((err) => isReady = err)
            .finally(done);
      });

      afterAll(() => {
         hlLogin.Logout()
         .done()
      })

    });