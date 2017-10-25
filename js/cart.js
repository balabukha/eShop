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
            showMainCart(allItems)
})
};


function showMainCart(allItems){
let str = '';
    if(isEmpty(getLocalStorage)){
        str = '<p>no elements</p>';
        let div = document.querySelector('.main-cart');
        div.innerHTML = str;
    };
    for (let id in getLocalStorage){
        str += `
        <div>
        <button class="mainCartDelete" data-id="${allItems[id-1].id}">X</button>
        <img src="images/${allItems[id-1].img}" alt="">
        <span>${allItems[id-1].name}</span>
        <span>куплено:</span>
        <button class="mainCartMinus" data-id="${allItems[id-1].id}">-</button>
        <span>${getLocalStorage[allItems[id-1].id]}</span>
        <button class="mainCartPlus" data-id="${allItems[id-1].id}">+</button>
        </div>`;

        let div = document.querySelector('.main-cart');
        div.innerHTML = str;

    }

    function saveCart(object){
        let serialObj = JSON.stringify(object);
        localStorage.setItem("CART", serialObj);
    }

    function onDelete(e){
        let id = +this.getAttribute("data-id");
        let newLocalStorage = {};
        for(let item in getLocalStorage){
            if(id != +item){
                newLocalStorage[item] = getLocalStorage[item];
            }
        }
        getLocalStorage = newLocalStorage;

        saveCart(getLocalStorage);
        init();
    }

    function onMinus(e){
        console.log('minus', e);
        let id = +this.getAttribute("data-id");
        for(let item in getLocalStorage){
            if(id == +item){
            //     if(getLocalStorage[+item] === 1){
            //         onDelete();
            //         console.log("getLocalStorage[+item]",getLocalStorage[+item])
            //     }
            // } else {
                if (getLocalStorage[+item] === 1){
                //
                    console.log("1")
                } else {
                    console.log("more 1");
                    getLocalStorage[item]--;
                }

            }
        }
        saveCart(getLocalStorage);
        init();
    };

    function onPlus(e){
        console.log('plus', e);
        let id = +this.getAttribute("data-id");
        for(let item in getLocalStorage){
            if(id == +item){
                getLocalStorage[item]++;
            }
        }
        saveCart(getLocalStorage);
        init();
    };

    // DELETE BTN
    let deleteBtn = document.querySelectorAll('.mainCartDelete');
    deleteBtn.forEach((item)=>{
        console.log(item);
        return item.addEventListener('click', onDelete)
    });

    // MINUS BTN
    let minusBtn = document.querySelectorAll('.mainCartMinus');
    minusBtn.forEach((item)=>{
        console.log(item);
        return item.addEventListener('click', onMinus)
    });

    // PLUS BTN
    let PlusBtn = document.querySelectorAll('.mainCartPlus');
    PlusBtn.forEach((item)=>{
        console.log(item);
        return item.addEventListener('click', onPlus)
    });

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}

let buttonSend = document.querySelector('.sendMsg');
buttonSend.addEventListener('click', sendMsg);

function sendMsg(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let text = document.getElementById('text').value;
    if (name && email && text){
        console.log(name,email,text);

        var xhr = new XMLHttpRequest();
        let json = JSON.stringify({
            "name": name,
            "email": email,
            "text": text,
            "content": getLocalStorage
        });
        xhr.open("POST", '/submit', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            alert( this.responseText );
        };

// Отсылаем объект в формате JSON и с Content-Type application/json
// Сервер должен уметь такой Content-Type принимать и раскодировать
        xhr.send(json);



    } else {
        alert('fill all fields')
    }
};

init();
