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
        <button class="mainCartDelete" data-id="${allItems[id-1].id}">X</button>
        <img src="images/${allItems[id-1].img}" alt="">
        <span>${allItems[id-1].name}</span>
        <span>куплено:</span>
        <span>${getLocalStorage[allItems[id-1].id]}</span>
        </div>`;

        let div = document.querySelector('.main-cart');
        div.innerHTML = str;

    }

    function onDelete(e){
        let id = +this.getAttribute("data-id");
        let newLocalStorage = {};
        console.log("id",id);
        console.log("getLocalStorage",getLocalStorage[id]);
        for(let item in getLocalStorage){
            if(id == +item){
                console.log("+item",+item);
                delete getLocalStorage.item;
                console.log(getLocalStorage);
            } else {
                console.log('no element', getLocalStorage.id, id);
                newLocalStorage[item] = getLocalStorage[item];

            }
        }
        let serialObj = JSON.stringify(newLocalStorage);
        localStorage.setItem("CART", serialObj);
        console.log("newLocalStorage", newLocalStorage)
        console.log("serialObj", serialObj)
        getLocalStorage = newLocalStorage;
        console.log("getLocalStorage", getLocalStorage)

        loadJSON(function(response) {
            // Parse JSON string into object
            let allItems = JSON.parse(response);
            // let str = '';
            // if(isEmptyCart()){
                showMainCart(allItems)
            // } else(
            //     showMainCart(allItems)
            // )
        });
    }

    let deleteBtn = document.querySelectorAll('.mainCartDelete');
    deleteBtn.forEach((item)=>{
        console.log(item);
        return item.addEventListener('click', onDelete)
    })
}

init();
