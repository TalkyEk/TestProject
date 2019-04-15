let add = document.getElementById('tovlist');
let tik = document.getElementById('post');

tik.addEventListener('click', function() {
  const url = document.getElementById('inputurl').value;
  const name = document.getElementById('inputname').value;
  const desc = document.getElementById('inputdesc').value;
  
  let tovTemplate = `<div>\
				<img src="${url}" alt="${name}" class="img">\
				<h2 class="name-product id="${name}">${name}</h2>\
				<p class="description">${desc}</p>\
				<button id="button-del">Delete</button>\
				<button id="button-cg">Change</button>\
				</div>`;
  add.innerHTML += tovTemplate;
  if(localStorage.getItem('microbd') != undefined) {
    const dobavka = JSON.parse(localStorage.getItem('microbd'));
    dobavka.push({ tovar: url, name: name, description: desc});
    return localStorage.setItem('microbd', JSON.stringify(dobavka));
  }
  tovdata.push({ tovar: url, name: name, description: desc });
  localStorage.setItem('microbd', JSON.stringify(tovdata));
});

window.onload = function() {
  if(localStorage.getItem('microbd') !== null) {
    const posting = JSON.parse(localStorage.getItem('microbd'));
    
    posting.forEach(function(e, index) {
      if(e === 'delete') return;
      let tovTemplate = `<div>\
				<img src="${e.tovar}" alt="${e.name}" class="img">\
				<h2 class="name-product" id="${e.name}">${e.name}</h2>\
				<p class="description">${e.description}</p>\
				<button id="button-del" data-index=${index}>Delete</button>\
				<button id="button-cg" class="button-cg">Change</button>\
			</div>`;
      add.innerHTML += tovTemplate;
    });
  }
  
  const btn = document.querySelectorAll('#button-del');
  for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
      let data1 = this.dataset.index;
      btn[i].parentElement.innerHTML = '';
      let xz = JSON.parse(localStorage.getItem('microbd'));
      xz.splice(data1, 1, 'delete');
      localStorage.setItem('microbd', JSON.stringify(xz));
    });
  }
  
  const modal = document.getElementById('myModal');
  const btnChange = document.querySelectorAll('.button-cg');
  const span = document.getElementsByClassName('close')[0];
  
  btnChange.forEach(function (btn) {
    btn.onclick = function() {
      modal.style.display = 'block';
      const currentmodal = btn.parentElement;
      const indexmodal = currentmodal.querySelector("#button-del").dataset.index;
      const currentedit = document.querySelector("#myModal");
      currentedit.setAttribute("index", indexmodal);
    };
  });
  
  span.onclick = function() {
    modal.style.display = 'none';
  };
  
  window.onclick = function(event) {
    if(event.target == modal) {
      modal.style.display = 'none';
    }
  };
  
  const changes = document.getElementById('change');
  changes.onclick = function(e) {
  	event.preventDefault();
  	let data1 = e.currentTarget;
  	const newurl = document.getElementById('inputnewurl').value;
    const newname = document.getElementById('inputnewname').value;
    const newdesc = document.getElementById('inputnewdesc').value;
    const curedit = data1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
    console.log(curedit);
    let xz = JSON.parse(localStorage.getItem('microbd'));
    xz.splice(curedit, 1, { tovar: newurl, name: newname, description: newdesc});
    localStorage.setItem('microbd', JSON.stringify(xz));
    modal.style.display = 'none';
    location.reload();
  }
};