cart = {};
var getLocalStorage = JSON.parse(localStorage.getItem("CART"));
console.log(getLocalStorage);

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
    for (let id in getLocalStorage){

        // console.log('id', id);
        console.log(allItems[id]);
        // console.log(getLocalStorage);

    }
}

init();
// console.log(loadCART());