let test;
let data = [];
const postbtn = document.getElementById('post');
const add = document.getElementById('list');

window.onload = () => {
	if(localStorage.getItem('microbd') !== null) {
		const posting = JSON.parse(localStorage.getItem('microbd')); 
		posting.forEach( e => {
			let tovTemplate = createPost(e.url, e.name, e.description, e.index);
			add.innerHTML += tovTemplate;
		});
		createDeleteEvent();
		createChangeEvent();
	}
};

const addPost = () => {
	const index = Date.now();
	const url = document.getElementById('inputurl').value;
	const name = document.getElementById('inputname').value;
	const desc = document.getElementById('inputdesc').value;
	const form = document.getElementById('itemform');
  
	const tovTemplate = createPost(url, name, desc, index);
	add.innerHTML += tovTemplate;
	if(localStorage.getItem('microbd') != undefined) {
		const newPost = JSON.parse(localStorage.getItem('microbd'));
		newPost.push({ url, name, description: desc, index});
		createDeleteEvent();
		createChangeEvent();
		form.reset();
		return localStorage.setItem('microbd', JSON.stringify(newPost));
	}
	data.push({ url, name, description: desc, index});
	localStorage.setItem('microbd', JSON.stringify(data));
	createDeleteEvent();
	createChangeEvent();
	form.reset();
}

postbtn.addEventListener('click', addPost);

const createPost = (url, name, description, index) => (
			`<div>\
				<img src="${url}" alt="${name}" class="img">\
				<h2 class="name-product" id="${name}">${name}</h2>\
				<p class="description">${description}</p>\
				<button id="button-del" data-index=${index}>Delete</button>\
				<button id="button-cg" class="button-cg">Change</button>\
			</div>`
);

const createDeleteEvent = () => {
	const btn = document.querySelectorAll('#button-del');
	for(let i = 0; i < btn.length; i++) {
	    btn[i].addEventListener('click', function() {
		    const datasetIndex = this.dataset.index;
		    btn[i].parentElement.innerHTML = '';
		    const localbd = JSON.parse(localStorage.getItem('microbd'));
		    const deleted = localbd.filter((el) => el.index != datasetIndex);
		    localStorage.setItem('microbd', JSON.stringify(deleted));
	    });
  	}
}

const createChangeEvent = () => {
	const modal = document.getElementById('myModal');
	const btnChange = document.querySelectorAll('.button-cg');
	const span = document.getElementsByClassName('close')[0];
	btnChange.forEach(btn => {
		btn.addEventListener('click', () => {
			modal.style.display = 'block'; 
			const currentmodal = btn.parentElement;
			test = currentmodal.querySelector("#button-del").dataset.index;
		});
	});
	span.addEventListener('click', () => {
		modal.style.display = 'none';
	}); 
	window.addEventListener('click', event => {
		if(event.target == modal) {
			modal.style.display = 'none';
		}
	});
	changeIt(modal);
}

const changeIt = modal => {
	const changes = document.getElementById('change');
	changes.addEventListener('click', e => {
		e.preventDefault();
		const index = Date.now();
		const newURL = document.getElementById('inputnewurl').value;
		const newName = document.getElementById('inputnewname').value;
		const newDesc = document.getElementById('inputnewdesc').value;
		const localbd = JSON.parse(localStorage.getItem('microbd'));
		const form = document.getElementById('modalForm');
		const curentelement= localbd.map((e) => {return e.index;}).indexOf(parseInt(test, 10));
		localbd.splice(curentelement, 1, { url: newURL, name: newName, description: newDesc, index: test});
		localStorage.setItem('microbd', JSON.stringify(localbd));
		modal.style.display = 'none';
		form.reset();
		liveChange(newURL, newName, newDesc);
	});
}

const liveChange = (url, name, description) => {
	const oldPost = document.querySelector(`[data-index="${test}"]`).parentElement;
	oldPost.innerHTML = createPost(url, name, description, test);
	createDeleteEvent();
	createChangeEvent();
}	