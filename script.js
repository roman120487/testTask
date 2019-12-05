// ----------kassa-------------
let calcForm = document.forms['calc'];
let summ = 0;
let price = 0;
let dolars = 0;
let cents = 0;
let centsNom;
let result = 0;
let cents50;
let cents25;
let cents10;
let cents5;
let cents1;

calcForm.returnRestBTN.onclick = function () {
    summ = +calcForm.summ.value;
    price = +calcForm.price.value;
    result = summ - price;

    result = result.toFixed(2)
    // console.log(result);

    dolars = Math.trunc(result);
    cents = result.split(".")[1].substr(0, 2);
    calcForm.result.value = `${dolars} доларів, ${cents} центів`;
    centsNom = cents;
    calcForm.nominals.value = `${dolars} доларів,`

    while (centsNom != 0) {
        if ((centsNom / 50) >= 1) {
            cents50 = 50;
            centsNom -= 50;
            calcForm.nominals.value += ` ${cents50} центів,`;
        } else if ((centsNom / 25) >= 1) {
            cents25 = 25;
            centsNom -= 25;
            calcForm.nominals.value += ` ${cents25} центів,`;
        } else if ((centsNom / 10) >= 1) {
            cents10 = 10;
            centsNom -= 10;
            calcForm.nominals.value += ` ${cents10} центів,`;
        } else if ((centsNom / 5) >= 1) {
            cents5 = 5;
            centsNom -= 5;
            calcForm.nominals.value += ` ${cents5} центів,`;
        } else {
            cents1 = 1;
            centsNom -= 1;
            calcForm.nominals.value += ` ${cents1} цент,`;
            // centsNom = 0;
        }
    }
}

// --------------------------------------------------------------

// ------- modal window--------------