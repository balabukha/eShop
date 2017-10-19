let CART = {};

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

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        let data = JSON.parse(response);
        // console.log('json', data);
        let str = '';
        // str += data.map((item)=>{
        //     console.log(item);
        //     return (
        //         `<div class="cart">
        //         <p class="name">${item.name}</p>
        //         <img src="images/${item.img}" alt="">
        //         <div class="cost">${item.cost}</div>
        //         <button class="add-to-cart">add to cart</button>
        //         </div>`
        //     )
        // });

        data.forEach((item)=> {
            str += `<div class="cart">
                <p class="name">${item.name}</p>
                <img src="images/${item.img}" alt="">
                <div class="cost">${item.cost}</div>
                <button class="add-to-cart" data-id="${item.id}">add to cart</button>
                </div>`
        }
        );
        // console.log(str);
        let div = document.querySelector('.wrap');
        div.innerHTML = str;

        let elements = document.getElementsByTagName('button');
        for (let i=0; i<elements.length; i++){
            console.log(elements[i]);
            elements[i].addEventListener('click', addToCart, false)
        }    });
}

function addToCart(e){
    console.log('getAttribute', +this.getAttribute('data-id'));
if  (CART[+this.getAttribute('data-id')] === undefined ){
    CART[+this.getAttribute('data-id')] = 1
} else CART[+this.getAttribute('data-id')]++;
// console.log(CART);
showMiniCart();
saveCart();
};


function saveCart(){
    let serialObj = JSON.stringify(CART);
    localStorage.setItem("CART", serialObj);
    console.log('serialObj',serialObj)
}

function showMiniCart(){
    let item = '';
    for (let key in CART) {
        item += `<p>${key} ---> ${CART[key]}</p>`
    }
    document.querySelector('.mini-cart').innerHTML = item;
}

function loadCART(){
    if (JSON.parse(localStorage.getItem("CART"))) {
        CART = JSON.parse(localStorage.getItem("CART"))
    }
    showMiniCart();
}

window.onload = function() {
    init();
    loadCART();
};
