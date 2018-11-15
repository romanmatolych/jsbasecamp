/**
 * @file Script which count amount entered words, max,min and average length of entered word
 * @version 1.0
 * @author Yurii Koltso <yurkoga25@gmail.com>
 */
window.onload = function () {
    let calcBtn = document.getElementById('btn-calc');

    calcBtn.addEventListener('click', function() {

        findAmountWord('amount');

        findMaxLength("maxLength");

        findMinLength("minLength");

        findAverageLength("averageLength")
    }); 
};
/**
 * Converting entered words in array using regular expression, which find all spaces, punctuation marks
 * @param  {String} elemID - ID of DOM-element from which we take value
 * @returns {Obejct} - Array of entered words
 */
function createArr(elemID) {
    let elemValue = document.getElementById(elemID).value;

    let regExp = /(\B[^\W\wа-яіґ\d])|([^\W\wа-яіґ\d]\B)/gi;

   return elemValue.trim().replace(regExp, ' ').split(/\s+/g).filter(item => item);

}
/**
 * Find amount of entered words
 * @param  {String} elemID - ID DOM-element in which the result is inserted
 */
function findAmountWord(elemID) {
    let arr = createArr('area');
    console.log(arr);
    let elem = document.getElementById(elemID);

    !arr ? elem.textContent = 0 : elem.textContent = arr.length;
}

/**
 * Find max length of entered word
 * @param  {String} elemID - ID DOM-element in which the result is inserted
 */
function findMaxLength (elemID) {
    let arr = createArr('area');

    let elem = document.getElementById(elemID);
    if(!arr) {
        elem.textContent = 0;
        return;
    } 

    arr = arr.map(item => item.length);
    elem.textContent = Math.max(...arr);
}

/**
 * Find min length of entered word
 * @param  {String} elemID - ID DOM-element in which the result is inserted
 */
function findMinLength (elemID) {
    let arr = createArr('area');

    let elem = document.getElementById(elemID);
    if(!arr) {
        elem.textContent = 0;
        return;
    } 
    arr = arr.map(item => item.length);
    elem.textContent = Math.min(...arr);
}

/**
 * Find average length of entered word
 * @param  {String} elemID - ID DOM-element in which the result is inserted
 */
function findAverageLength(elemID) {
    let arr = createArr('area');

    let elem = document.getElementById(elemID);

    if(!arr) {
        elem.textContent = 0;
        return;
    } 
    arr = arr.map(item => item.length);

    let result = [].reduce.call(arr, (p,c) => c+p) / arr.length;
    elem.textContent = result.toFixed(2);
}