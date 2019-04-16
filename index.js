const add = document.getElementById('tovlist');
const tik = document.getElementById('post');
let test;
const index = Date.now();

tik.addEventListener('click', function() {
  const url = document.getElementById('inputurl').value;
  const name = document.getElementById('inputname').value;
  const desc = document.getElementById('inputdesc').value;
  
  let tovTemplate = createpost(url, name, desc, index);
  add.innerHTML += tovTemplate;
  if(localStorage.getItem('microbd') != undefined) {
    const dobavka = JSON.parse(localStorage.getItem('microbd'));
    dobavka.push({ url, name, description: desc, index});
    createdelevent();
    return localStorage.setItem('microbd', JSON.stringify(dobavka));
  }
  tovdata.push({ url, name, description: desc, index});
  localStorage.setItem('microbd', JSON.stringify(tovdata));
  createdelevent();
});

window.onload = function() {
  if(localStorage.getItem('microbd') !== null) {
    const posting = JSON.parse(localStorage.getItem('microbd')); 
    posting.forEach(function(e) {
      let tovTemplate = createpost(e.url, e.name, e.description, e.index);
      add.innerHTML += tovTemplate;
    });
  }
  
  const modal = document.getElementById('myModal');
  const btnChange = document.querySelectorAll('.button-cg');
  const span = document.getElementsByClassName('close')[0];
  
  btnChange.forEach(function (btn) {
    btn.onclick = function() {
      modal.style.display = 'block'; 
      const currentmodal = btn.parentElement;
      test = currentmodal.querySelector("#button-del").dataset.index;
      console.log(test);
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
  	const newurl = document.getElementById('inputnewurl').value;
    const newname = document.getElementById('inputnewname').value;
    const newdesc = document.getElementById('inputnewdesc').value;
    let xz = JSON.parse(localStorage.getItem('microbd'));
    const curentelement= xz.map((e) => {return e.index;}).indexOf(parseInt(test, 10));
    xz.splice(curentelement, 1, { url: newurl, name: newname, description: newdesc, index});
    console.log(xz);
    localStorage.setItem('microbd', JSON.stringify(xz));
    modal.style.display = 'none';
    livechange(newurl, newname, newdesc);
  }
};
function createpost (url, name, description, index) {
	let tovTemplate = `<div>\
				<img src="${url}" alt="${name}" class="img">\
				<h2 class="name-product" id="${name}">${name}</h2>\
				<p class="description">${description}</p>\
				<button id="button-del" data-index=${index}>Delete</button>\
				<button id="button-cg" class="button-cg">Change</button>\
			</div>`;
	return tovTemplate;
}
function livechange (url, name, description) {
	const oldPost = document.querySelector(`[data-index="${test}"]`).parentElement;
	oldPost.innerHTML = createpost(url, name, description);
}
function createdelevent() {
	const btn = document.querySelectorAll('#button-del');
	for(let i = 0; i < btn.length; i++) {
	    btn[i].addEventListener('click', function() {
		    let data1 = this.dataset.index;
		    btn[i].parentElement.innerHTML = '';
		    let xz = JSON.parse(localStorage.getItem('microbd'));
		    const newxz = xz.filter((el) => el.index != data1);
		    localStorage.setItem('microbd', JSON.stringify(newxz));
	    });
  	}
}