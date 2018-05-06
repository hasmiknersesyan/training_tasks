"use strict";

const poEl = require('../objects/elements.json'),
    poConst = require('../objects/const.json'),
    EC = protractor.ExpectedConditions,
    waitTime = 5000,
    Q = require('q');

    let _login = (param) => {
        let def = Q.defer();

          $(poEl.txtEmail).sendKeys(param.user)
                    .then(() => element(by.xpath(poEl.btnNextE)).click())
                    .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.txtPass))), waitTime, 'wait for password field visibility'))
                    .then(() => element(by.xpath(poEl.txtPass)).sendKeys(param.pass))
                    .then(() => browser.wait(EC.elementToBeClickable( element(by.xpath(poEl.btnNextP))), waitTime, 'wait for Nex button visibility'))
                    .then(() => element(by.xpath(poEl.btnNextP)).click())
                    .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.btnCompose))), waitTime, ' wait for user Loggs in'))
                    .then(() => def.resolve())
                    .catch((err) => def.reject(`LOGIN: error - ${err}`));

          return def.promise;
    };

      let _logout = () => {
            let def = Q.defer();

               element(by.xpath(poEl.profile)).click()
                        .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.pfWindow))), waitTime, 'wait for profile window visibility'))
                        .then(() => element(by.linkText(poEl.lnkSignOut)).click())
                        .then(() => def.resolve())
                        .catch((err) => def.reject(`LOGOUT: error - ${err}`));

              return def.promise;
        };

 module.exports = {
    Login: _login,
    Logout: _logout
 }



