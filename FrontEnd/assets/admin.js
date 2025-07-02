console.log('admin.js');
updateGallery();

async function getCateg() {
	const apiCateg = 'http://localhost:5678/api/categories';
		try {
		const response = await fetch(apiCateg);
			if (!response.ok){
				throw new Error(`Response status: ${response.status}`)
			}else{
			
            const categData = await response.json();
			console.log(categData);
			return categData;
			};
	     }catch (error) {
            console.error(error.message);
		  }
	};

async function getWorks() {
	const apiWorks = 'http://localhost:5678/api/works';
		try {
		const response = await fetch(apiWorks);
			if (!response.ok){
				throw new Error(`Response status: ${response.status}`)
			}
			
            const works = await response.json();
            console.log(works);
			return works;
	     }catch (error) {
            console.error(error.message);
		  }
	};

//Update gallery content
async function updateGallery(){
  const works = await getWorks();
  //const galleryContainer = document.querySelector('.gallery');
  const modalGallery = document.querySelector('.modal-gallery');
  
  works.forEach((work, index) =>{
    //const figure = galleryContainer.children[index];
    //const img = figure.querySelector('img');
    //const figCaption = figure.querySelector('figcaption');

	const modalFigure = modalGallery.children[index];
	const modalImg = modalFigure.querySelector('[class="modal-img"]')

    //img.src = work.imageUrl;
    //img.alt = work.title;
    //figCaption.textContent = work.title;
	//figure.id = work.id
    //figure.className = work.category.name

	modalFigure.id = work.id;
	modalFigure.className = work.category.name
	modalImg.src = work.imageUrl;
	modalImg.alt = work.title;
  });
};

//modal-related event listeners & variables
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('exit-button');
const backButton = document.getElementById('back-button');
const modalWindow = document.querySelector('#modal-window');
const modalOne = modalWindow.querySelector('.modal-1');
const modalTwo = modalWindow.querySelector('.modal-2');
const addPhoto = modalOne.querySelector('#add-button');

const photoForm = document.getElementById('photo-form');
const categorySelect = document.getElementById('category-select');



openModal.addEventListener('click', () =>{
	modalWindow.showModal();
	modalOne.style.display = 'block';
	modalTwo.style.display = 'none';
});
closeModal.addEventListener('click', () =>{
	modalWindow.close();
});

addPhoto.addEventListener('click', () =>{
	modalOne.style.display = 'none';
	modalTwo.style.display = 'block';
});
backButton.addEventListener('click', () =>{
	modalTwo.style.display = 'none';
	modalOne.style.display ='block';
});

async function populateCategorySelection() {
	const categories = await getCateg();

	categories.forEach((category) =>{
		const categoryOption = document.createElement('option');
		categoryOption.value = category.id;
		categoryOption.textContent = category.name;
		categorySelect.appendChild(categoryOption);
	});
}

/*async function workSubmission(){
	const apiWorks = 'http://localhost:5678/api/works';
	try{
		const response = await fetch(apiWorks, {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({'id': `0`,
				'title': `string`,
				'imageUrl': `string`,
				'categoryId': `string`,
				'userId': `0`
			})
		}).then(response => response.json())
		.then(data =>{
			console.log(data)
		});
	}catch (error){
		console.error(`error.message`);
	}
	
}*/

//This event listener loads the categories for the modal when the page is open
document.addEventListener('DOMContentLoaded', populateCategorySelection);