cart = {};
var getLocalStorage = JSON.parse(localStorage.getItem("CART"));
// console.log(getLocalStorage);

// getting JSON DATA
function loadJSON(callback) {

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("../");
    xobj.open('GET', 'goods.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
// ****

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        let allItems = JSON.parse(response);
        let str = '';
        if(isEmptyCart()){
            str = 'the cart is Empty!'
        } else(
            showMainCart(allItems)
        )
})
};



function isEmptyCart(){
    if (!getLocalStorage) {
        return true;
    } else {
        return false;
    }
};


function showMainCart(allItems){
let str = '';
    for (let id in getLocalStorage){
        str += `
        <div>
        <button class="mainCartDelete">X</button>
        <img src="images/${allItems[id-1].img}" alt="">
        <span>${allItems[id-1].name}</span>
        <span>куплено:</span>
        <span>${getLocalStorage[allItems[id-1].id]}</span>
        </div>`;

        let div = document.querySelector('.main-cart');
        div.innerHTML = str;

    }

    let deleteBtn = document.querySelectorAll('.mainCartDelete');
    deleteBtn.forEach((item)=>{
        return item.addEventListener('click', ()=>{console.log(this)})
    })
}

init();
// console.log(loadCART());