let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("sumbit");
let input = document.querySelector('input');
let flag = 'create';
let global;
//get total of price
function getTotal(){
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.backgroundColor="#020"
    }
    else
    {
        total.innerHTML='';
        total.style.backgroundColor="#911717"
    }
}
//create data
let arry;
if(localStorage.product != null)
{
    arry= JSON.parse(localStorage.product)
}else
{
    arry=[];
}

submit.onclick = function(){
    let objpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if (title.value != '') {
            if (flag === 'create') {
            if (objpro.count >1) {
            for (let i = 0; i < objpro.count; i++) {
                arry.push(objpro);
            }
        }
        else
        {
            arry.push(objpro);
        }
    }
    else
    {
        arry[global] = objpro;
        flag = 'create';
        submit.innerHTML = "create";
        count.style.display = 'block';
    }
    clearData();
    }

   
    localStorage.setItem('product', JSON.stringify(arry));
    getData();
}
//clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//read
function getData(){
    getTotal();
    let table = '';
    for (let i = 0; i < arry.length; i++) {
        table += 
        `       <tr>
                    <td>${i+1}</td>
                    <td>${arry[i].title}</td>
                    <td>${arry[i].price}</td>
                    <td>${arry[i].taxes}</td>
                    <td>${arry[i].ads}</td>
                    <td>${arry[i].discount}</td>
                    <td>${arry[i].total}</td>
                    <td>${arry[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData()" id="delete">delete</button></td>
                </tr> `;
    }
    document.getElementById('tbody').innerHTML=table;
    if (arry.length > 0) {
        document.getElementById("deleteAll").innerHTML=
        `
        <button onclick="deleteAllData()">Delete All (${arry.length})</button>
        ` 
    }else{
        document.getElementById("deleteAll").innerHTML='';
    }
}
getData();
//delete data
function deleteData(i){
    arry.splice(i,1)
    localStorage.product = JSON.stringify(arry);
    getData();
}
//delete all data
function deleteAllData(){
    arry.splice(0);
    localStorage.clear;
    getData();
}
//update data
function updateData(i){
    title.value = arry[i].title;
    price.value = arry[i].price;
    taxes.value = arry[i].taxes;
    ads.value = arry[i].ads;
    discount.value = arry[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = arry[i].category;
    submit.innerHTML = "update";
    flag = 'update';
    global = i;
    scroll({
        top:0,
        behavior:'smooth'

    })
    }
    //search

    let searchFlag = 'title' ;
    function searchType(id){
        let search = document.getElementById('search');
        if(id == 'searchTitle')
        {
            searchFlag = 'title';
            search.placeholder = 'Search By Title';
        }else
        {
            searchFlag = 'category';
            search.placeholder = 'Search By Category';

        }
        search.focus();
        search.value = '';
        getData();
    }

    function searchData(value){
        let table = '';
        for (let i = 0; i < arry.length; i++) {
            if (searchFlag == 'title') {
                    if(arry[i].title.includes(value.toLowerCase()))
                    {
                        table += 
                        `       <tr>
                                    <td>${i+1}</td>
                                    <td>${arry[i].title}</td>
                                    <td>${arry[i].price}</td>
                                    <td>${arry[i].taxes}</td>
                                    <td>${arry[i].ads}</td>
                                    <td>${arry[i].discount}</td>
                                    <td>${arry[i].total}</td>
                                    <td>${arry[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="deleteData()" id="delete">delete</button></td>
                                </tr> `;
                    }
            }else
            {
                    if(arry[i].category.includes(value.toLowerCase()))
                    {
                        table += 
                        `       <tr>
                                    <td>${i+1}</td>
                                    <td>${arry[i].title}</td>
                                    <td>${arry[i].price}</td>
                                    <td>${arry[i].taxes}</td>
                                    <td>${arry[i].ads}</td>
                                    <td>${arry[i].discount}</td>
                                    <td>${arry[i].total}</td>
                                    <td>${arry[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="deleteData()" id="delete">delete</button></td>
                                </tr> `;
                    }
            }
    }
    document.getElementById('tbody').innerHTML=table;
}