"use strict";

/*TASK1:Create a function(s) that fulfills array with 10 random integer values and returns a multiply of 3 greatest values. */

let _multiplyValues = () => {

    let arr = [];
    for(let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    let arrMax = arr.sort().slice(7);

    let result = 1;
    for(let i = 0; i < arrMax.length; i ++) {
        result = result * arrMax[i];
    }

    return result;
};
//console.log(_multiplyValues());


/*TASK2: Create a function(s) that returns total amount of seconds starting from the beginning of today and till now.*/

let _countSeconds = () => {
    let sec = 3600;
    let totalSeconds = 0;

    let d = new Date().toLocaleTimeString();
    let arrTime = d.split(':');

    for(let i = 0; i < arrTime.length; i++) {
        totalSeconds = totalSeconds + arrTime[i] * sec;
        sec = sec/60;
    }
    console.log(d);

    return totalSeconds;
};
//console.log(_countSeconds());


/*TASK3: Define an object happiness within 5 properties.
 Each property should have default integer value, representing its priority.
 Then create a function that returns a list of property names sorted by priority (highest is on top).*/

 let obj = {
    prop1: 10,
    prop2: 10000,
    prop3: 1000,
    prop4: 1,
    prop5: 100
 };

 let _sortProps = (obj) => {
     let values = Object.values(obj);
     let keys = Object.keys(obj);
     let keysSorted = keys.sort((a, b) => obj[b] - obj[a]);

     return keysSorted;
 };
// console.log(_sortProps(obj));
