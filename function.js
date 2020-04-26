// globals
var myBrandSelect;

var listBrand   = document.getElementById('brandList');
var listModel   = document.getElementById('modelList');
var listYear    = document.getElementById('yearList');
var listCath    = document.getElementById('cathList');
var sliderState = document.getElementById('stateSlider');
var sliderOutput = document.getElementById('stateOutput');
var textCurrency = document.getElementById('currencyText');
var sendButton  = document.getElementById('sendButton');

var stateText = [null, 'Bara dålig', 'rätt dålig', 'rätt ok', 'rätt bra', 'jättebra'];

//startar på doc ready
$(document).ready(function () {

    initComponent(1);

    listBrand.options[0] = new Option('Brand >>>', '0');
    listModel.options[0] = new Option('Model >>>', '0');
    listYear.options[0] = new Option('Year >>>', '0');
    listCath.options[0] = new Option('Cathegory >>>', '0');

    // reducera dupletter
    var arrBrand = removeDuplicates(arrAll, 'brand');
    // populera brand
    for (var i = 0; i < arrBrand.length; i++) {
        listBrand.options[i + 1] = new Option(arrBrand[i].brand, arrBrand[i].id);
    }
    
    //send
    $("#sendButton").click(function () {

        var arr = [];
        var obj = {
            brand: listBrand.options[listBrand.selectedIndex].text,
            model: listModel.options[listModel.selectedIndex].text,
            intYear: listYear.options[listYear.selectedIndex].text,
            cath: listCath.options[listCath.selectedIndex].text,
            intState: sliderState.value,
            price: textCurrency.value
        };

        arr.push(obj);

        $.ajax({
            method: 'POST',
            data: { arr: JSON.stringify(arr) },
            cache: false,
            url: 'update.php',
            success: function (arr) {
                alert('REGISTRERAT...\n' + arr);
                //console.log(arr);
            }
        });
        closeComponent(6);
    });

});


function brandChanged() {

    initComponent(1);
    var selBrand = listBrand.options[listBrand.selectedIndex];
    if (selBrand.value == 0) {
        closeComponent(1);
    } else {
        openComponent(1);
        var mySelectedBrand = selBrand.innerHTML;
        myBrandSelect = filteredList(arrAll, "brand", mySelectedBrand);
        
        var myUniqueModels = removeDuplicates(myBrandSelect, 'model');
        for (var i = 0; i < myUniqueModels.length; i++) {
            listModel.options[i + 1] = new Option(myUniqueModels[i].model, myUniqueModels[i].id);
        }
    }
}


function modelChanged() {

    initComponent(2);
    selModel = listModel.options[listModel.selectedIndex];
    if (selModel.value == 0) {
        closeComponent(2);
    } else {
        openComponent(2);
        var mySelectedModel = selModel.innerHTML;
        myYearSelect = filteredList(myBrandSelect, "model", mySelectedModel);

        var myUniqueYears = removeDuplicates(myYearSelect, 'year');
        for (var i = 0; i < myUniqueYears.length; i++) {
            listYear.options[i + 1] = new Option(myUniqueYears[i].year, myUniqueYears[i].id);
        }
    }
}


function yearChanged() {

    initComponent(3);
    selYear = listYear.options[listYear.selectedIndex];
    if (selYear.value == 0) {
        closeComponent(3);
    } else {
        openComponent(3);
        var myUniqueCath = removeDuplicates(arrCath, 'cathegory');
        for (var i = 0; i < myUniqueCath.length; i++) {
            listCath.options[i + 1] = new Option(myUniqueCath[i].cathegory, myUniqueCath[i].id);
        }
    }
}


function cathChanged() {

    initComponent(4);

    selCath = listCath.options[listCath.selectedIndex];
    if (selCath.value == 0) {
        closeComponent(4);
    } else {
        sliderState.disabled = false;
        sliderState.classList.remove('sliderGray');
        sliderState.classList.add('sliderGreen');
        openComponent(4);
    }
}

sliderState.oninput = function() {
    var stateValue = parseInt(this.value);
    sliderOutput.innerHTML = stateText[stateValue];
    openComponent(5);
}


function price() {
    myPrice = parseInt(textCurrency.value);
    if( isNaN(myPrice) || myPrice < 1 || myPrice > 300000) {
        sendButton.disabled = true;
        sendButton.classList.remove('btn-success');
        sendButton.classList.add('btn-secondary');
    } else {
        openComponent(6);
    }
}


function initComponent(level) {

    switch(level) {
        case 1 :
            listModel.disabled = true;
            listModel.classList.add('noDrop');
            var x =  listModel.length;
            for (var i = 1; i < x; i++) {
                listModel.options[1] = null;
            }

        case 2 : 
            listYear.disabled = true;
            listYear.classList.add('noDrop');
            for (var i = 1; i < listYear.length; i++) {
                listYear.options[i] = null;
            }

        case 3 :
            listCath.disabled = true;
            listCath.classList.add('noDrop');
            for (var i = 1; i < listCath.length; i++) {
                listCath.options[i] = null;
            }

        case 4 : 
            sliderState.disabled = true;
            sliderState.classList.remove('sliderGreen');
            sliderState.classList.add('sliderGray');

        case 5 : 
            textCurrency.disabled = true;
            textCurrency.value = null;
            textCurrency.classList.add('noDrop');

        case 6 :
            sendButton.disabled = true;
            sendButton.classList.remove('btn-success');
            sendButton.classList.add('btn-secondary');
            sendButton.classList.add('noDrop');
    }
}


function openComponent(level) {

    switch(level) {
        case 6 : 
            sendButton.classList.remove('btn-secondary');
            sendButton.classList.add('btn-success');
            sendButton.disabled = false;

        case 5 :
            textCurrency.disabled = false;
            textCurrency.classList.remove('noDrop');

        case 4 : 
            sliderState.disabled = false;
            sliderState.classList.remove('sliderGray');
            sliderState.classList.add('sliderGreen');

        case 3 : 
            listCath.disabled = false;
            listCath.classList.remove('noDrop');

        case 2 :
            listYear.disabled = false;
            listYear.classList.remove('noDrop');

        case 1 :
            listModel.disabled = false;
            listModel.classList.remove('noDrop');
    }
}


function closeComponent(level){

    switch(level) {
        case 1 :
            listModel.disabled = true;
            listModel.selectedIndex = 0;
            listModel.classList.add('noDrop');

        case 2 :
            listYear.disabled = true;
            listYear.selectedIndex = 0;
            listYear.classList.add('noDrop');

        case 3 :
            listCath.disabled = true;
            listCath.selectedIndex = 0;
            listCath.classList.add('noDrop');

        case 4 :
            sliderState.disabled = true;
            sliderState.value = 3;
            sliderState.classList.remove('sliderGreen');
            sliderState.classList.add('sliderGray');
            sliderOutput.innerHTML = "";

        case 5 :
            textCurrency.disabled = true;
            textCurrency.classList.add('noDrop');
            textCurrency.value = null;

        case 6 : 
            sendButton.disabled = true;
            sendButton.classList.remove('btn-success');
            sendButton.classList.add('btn-secondary');
    }
}

function removeDuplicates(myArr, key) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
}


function filteredList(array, key, value) {
    // reducerar array med vald key: value
    var i, j, result = [], item;

    for (i = 0, j = array.length; i < j; i++) {
        item = array[i];
        if (typeof item[key] !== "undefined" && item[key] === value) {
            result.push(item);
        }
    }
    return result;
}
