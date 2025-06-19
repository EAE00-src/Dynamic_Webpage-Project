console.log('index.js');
updateGallery();
//button variables
const filters = document.getElementsByClassName('filters');
const filterAll = document.getElementById('b-All');
const filterObj = document.getElementById('b-Obj');
const filterApt = document.getElementById('b-Apt');
const filterVen = document.getElementById('b-Ven');
//Gallery variable
let galleryContainer = document.querySelector('.gallery');


//function for hiding all images/figures
function hideAll() {
  document.querySelectorAll('.gallery figure').forEach(item => {
    item.style.display = 'none';
  });
}
//function for revealing all images at once
function showAll(){
    document.querySelectorAll('.gallery figure').forEach(item =>{
        item.style.display = 'inline-block';
    });
};


//Function to show elements by class
function showByClass(className) {
  document.querySelectorAll(`.gallery figure.${className}`).forEach(item => {
    item.style.display = 'inline-block';
  });
}

//Event listener for "Objects" button
filterObj.addEventListener('click', () => {
  hideAll();
  showByClass('obj');
});

//Event listener for "Apartments" button
filterApt.addEventListener('click', () => {
  hideAll();
  showByClass('apt');
});

//Event listener for "Venues" button
filterVen.addEventListener('click', () => {
  hideAll();
  showByClass('venue');
});

//Event Listener for "All" button
filterAll.addEventListener('click', () =>{
    showAll();
});


//Job retrieval from backEnd to pre-existing images
async function getWorks(){
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

async function updateGallery(){
  const works = await getWorks();
  
  works.forEach((work, index) =>{
    const figure = galleryContainer.children[index];
    const img = figure.querySelector('img');
    const figCaption = figure.querySelector('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title;
  });
};
