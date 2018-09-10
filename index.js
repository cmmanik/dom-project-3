let userList = [
    {
        name:'CM Manik',
        email:'mkmanik@gmail.com',
        phn: '01780849889'
    },
    {
        name:'Tarek Masud',
        email:'tarek@gmail.com',
        phn: '01742598745'
    },
    {
        name:'Pori Roy',
        email:'pori@gmail.com',
        phn: '01714785963'
    },
    {
        name:'Joy Chowdury',
        email:'joy99@gmail.com',
        phn: '01769874125'
    },
    {
        name:'Dipa Roy',
        email:'dipa98@gmail.com',
        phn: '01789574125'
    }
]

let showBtn = document.querySelector('.shwdata');
let ul = document.querySelector('.mainUl');
let editeDiv = document.querySelector('.edittdiv');
let favoriteMainUl =document.getElementById('favoriteList');

class User {
    constructor(name,email,phn) {
        return {
            name:name,
            email:email,
            phn:phn
        }
    }
}

class UI {

    adduser(user) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
         li.innerHTML =  `
         <div class="row">
         <div class="col-sm-6 editin">
             <h5 class="mb-1">Name : ${user.name}</h5>
             <h5 class="mb-1">Email:${user.email}</h5>
             <h5 class="mb-1">Contuct: ${user.phn}</h5>
         </div>
         <div class="col-sm-6" style="text-align:end">
             <p title="Edite" class=""><i class="fa fa-pencil-square-o editbtn"></i></p>
             <p title="Add Favorite"><i class="fa fa-heart-o addFv"></i></p>
             <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
         </div>
       </div>
         `;
         ul.insertBefore(li, ul.childNodes[0]);
    }

    deleteUser(target) {
        if(target.className == 'fa fa-trash-o dlticon'){
            target.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }

    clearField() {
        document.getElementById('name').value = '' ;
        document.getElementById('email').value = '' ;
        document.getElementById('phn').value = '' ;
    }

    editeevent(target) {
        if(target.className == 'fa fa-pencil-square-o editbtn'){
            let fname = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerText;
            let name = fname.slice(6)
            let femail = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].textContent;
            let email = femail.slice(6)
            let fphn = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[5].textContent;
            let phn = fphn.slice(8)
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="modal-body">
              <div class="form-group">
                <label for="name" class="col-form-label">Name</label>
                <input type="text" class="form-control" id="namess" value ="${name}">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="emailss" value ="${email}">
              </div>
              <div class="form-group">
                <label for="phn" class="col-form-label">Phone:</label>
                <input type="text" class="form-control" id="phnss" value ="${phn}">
              </div>
              <button type="subnit" class="btn btn-primary" id="update">OK</button>
          </div>
         `;
         editeDiv.append(div);
         let okkbtn = document.getElementById('update');
         okkbtn.addEventListener('click', function(){
            let newName = document.getElementById('namess').value;
            let newEmail = document.getElementById('emailss').value;
            let newPhn = document.getElementById('phnss').value;
            updateData(newName,newEmail,newPhn);
            div.remove();
         })
         
            target.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
}

let adBtn = document.getElementById('addBtn');
adBtn.addEventListener('click',function(e){
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phn = document.getElementById('phn').value;

    let UserObj = new User(name,email,phn);
    let ui = new UI();

    if(name == '' || email == '' || phn == ''){
        alert('Please fill the all fields!')
    } else{
        userList.push(UserObj)
        ui.adduser(UserObj);
        ui.clearField();
    }

    // console.log(UserObj);
    e.preventDefault();
})

// Delete event
ul.addEventListener('click',function(e){
    let ui = new UI();
    ui.deleteUser(e.target);
});

let userListArr = userList.map(function(user){
    let li = document.createElement('li');
    li.className = 'list-group-item';
     li.innerHTML =  `
         <div class="row">
         <div class="col-sm-6 editin">
             <h5 class="mb-1">Name : ${user.name}</h5>
             <h5 class="mb-1">Email:${user.email}</h5>
             <h5 class="mb-1">Contuct: ${user.phn}</h5>
         </div>
         <div class="col-sm-6" style="text-align:end">
             <p title="Edite"><i class="fa fa-pencil-square-o editbtn"></i></p>
             <p title="Add Favorite"><i class="fa fa-heart-o addFv"></i></p>
             <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
         </div>
     </div>
     `
     return li;
 })

// Show and Add form User array data
showBtn.addEventListener('click',function(){

    userListArr.forEach(function(ee){
        ul.append(ee);
        // ul.onclick = editeEvent;
    })
   
});

// Edit User event 

ul.addEventListener('click',function(e){
    let ui = new UI();
    ui.editeevent(e.target);
})

function updateData(name,email,phn) {
    let UserObj = new User(name,email,phn);
    let ui = new UI();
    ui.adduser(UserObj);
}

console.log(userList.length);

// Added User favourite item

ul.addEventListener('click', function(e){
   if(e.target.className == 'fa fa-heart-o addFv'){
       addfovorite(e.target)
   }
});

// Add data favorite item list

var fvrtListArry =[1];
function addfovorite(target) {

    var fadata = target.parentElement.parentElement.parentElement.childNodes[1];
    let copyfdata = fadata.cloneNode(true)
    
    // check data for already exist or not 
    var datfound = fvrtListArry.find(function(element) {
      return element == fadata;
    });

   
    if(datfound == undefined) {
        // let copyfdata = fadata.cloneNode(true)
            let li = document.createElement('li');
            let alldataDiv = document.createElement('div');
            alldataDiv.className = 'row';
            li.className = 'list-group-item';
            let dltdiv= document.createElement('div');
            dltdiv.className = "col-sm-6";
            dltdiv.setAttribute('style',"text-align:end");
            dltdiv.innerHTML = `
                <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
            `;
            li.appendChild(alldataDiv);
            alldataDiv.appendChild(copyfdata);
            alldataDiv.appendChild(dltdiv);
            favoriteMainUl.appendChild(li)
            fvrtListArry.push(fadata)
    } else {
        alert('You are all Ready Add this favorit Item');
    }
    
}



// Remove User form Favorite list

favoriteMainUl.addEventListener('click',function(e){
    removeFavorte(e.target);
})

function removeFavorte(target) {
    if(target.className == "fa fa-trash-o dlticon") {
         target.parentElement.parentElement.parentElement.parentElement.remove();
    }
}

// testing delete form favorite item

// favoriteMainUl.addEventListener('click',function(e){
//     // removeFavorte(e.target);
//     var targetElemet = e.target.parentElement.parentElement.parentElement.childNodes[0];
//     for(var i=0; i<fvrtListArry.length; i++) {
//         if(fvrtListArry[i] == targetElemet) {
//             var indx = fvrtListArry[i]
//         }
//     }
//     console.log(targetElemet);
//     var re = targetElemet == fvrtListArry[1];
//     console.log(re);
// })