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
        }
    }
}

// --------------------------------------------------------------
// -----------------modal window-----------------------
let container2 = document.querySelector('.container2');
let modalBtn = document.querySelector('.modalBtn');
let div = document.createElement('div');

modalBtn.onclick = function () {
    container2.append(div);
    div.className = 'modal'
    document.querySelector('.modal').append(document.createElement('div'));
    document.querySelector('.modal').firstChild.className = 'modalBody';
    document.querySelector('.modalBody').append(document.createElement('button'));
    document.querySelector('.modalBody').firstChild.className = 'closeModal';
    document.querySelector('.closeModal').textContent = 'Close';

    let closeModal = document.querySelector('.closeModal');
    closeModal.onclick = function () {
        document.querySelector('.modal').remove();
    }
}



// ------- ------------------------------------------------
// -------------table-------------------------------
let formTable = document.forms['tableForm'];
let tbody = document.querySelector('tbody');
let td = document.createElement('td');
let data = new Date();
let id = 1;
let regExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

formTable.addBtn.onclick = function () {
    if (formTable.fName.value === '') {
        alert('Введіть Ваше імя')
    } else if (formTable.lName.value === '') {
        alert('Введіть Ваше прізвище')
    } else if (formTable.email.value === '') {
        alert('Введіть e-mail')
    } else if (regExp.test(formTable.email.value) === true) {
        tbody.append(document.createElement('tr'));
        id += 1;
        tbody.lastChild.id = `t${id}`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.textContent = `${id}`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.textContent = `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()} ${data.getHours()}:${data.getMinutes()} `;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.textContent = `${formTable.fName.value}`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.textContent = `${formTable.lName.value}`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.textContent = `${formTable.email.value}`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.innerHTML = `<button id="d${id}"  class="delete" onclick="deleteRow(event)">Delete</button>`;
        tbody.lastChild.append(document.createElement('td'));
        tbody.lastChild.lastChild.innerHTML = `<button id="e${id}"  class="edit" onclick="editRow(event)">Edit</button>`;

    } else {
        alert('ви ввели невірний формат e-mail')
    };
    resetForm();

}
let showBtn = true;

function deleteRow(event) {
    let del = confirm('Ви справді хочете видалити цей запис?')
    if (del == true) {
        let idDeleteRow = event.target.id.substr(1);
        document.querySelector(`#t${idDeleteRow}`).remove();
    }

}

let idEditRow;
function editRow(event) {
    formTable.saveBtn.style.display = 'block';
    formTable.addBtn.style.display = 'none';
    idEditRow = event.target.id.substr(1);
    formTable.fName.value = document.querySelector(`#t${idEditRow}`).childNodes[2].textContent;
    formTable.lName.value = document.querySelector(`#t${idEditRow}`).childNodes[3].textContent;
    formTable.email.value = document.querySelector(`#t${idEditRow}`).childNodes[4].textContent;
}

function saveRow() {
    if (regExp.test(formTable.email.value) === true) {
        document.querySelector(`#t${idEditRow}`).childNodes[2].textContent = formTable.fName.value;
        document.querySelector(`#t${idEditRow}`).childNodes[3].textContent = formTable.lName.value;
        document.querySelector(`#t${idEditRow}`).childNodes[4].textContent = formTable.email.value;
    } else {
        alert('ви ввели невірний формат e-mail');
    }
    resetForm();
    formTable.saveBtn.style.display = 'none';
    formTable.addBtn.style.display = 'block';

}

function resetForm() {
    formTable.fName.value = '';
    formTable.lName.value = '';
    formTable.email.value = '';
}



// ------------------------------------------------