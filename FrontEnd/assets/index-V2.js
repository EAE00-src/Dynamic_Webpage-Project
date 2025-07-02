console.log('index.js');
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
  //this query selects every figure within the div of '.gallery' and hides every 'item'
  document.querySelectorAll('.gallery figure').forEach(item => {
    item.style.display = 'none';
  });
}
//function for revealing all images at once
function showAll(){
  //this query selects every figure within the div of '.gallery' and displays every 'item'
    document.querySelectorAll('.gallery figure').forEach(item =>{
        item.style.display = 'inline-block';
    });
};


//Function to show elements by class names
//(updated to take class names from category names from backend)
function showByClass(className) {
  //this query accesses the parent element (.gallery) and and the children (figure) to specifically access the various class names
  document.querySelectorAll(`.gallery figure[class="${className}"]`).forEach(item => {
    item.style.display = 'inline-block';
  });
}

//Event listener for "Objects" button
filterObj.addEventListener('click', () => {
  //all figures are hidden before only displaying photos of the class of 'Objects'
  hideAll();
  showByClass('Objects');
});

//Event listener for "Apartments" button
filterApt.addEventListener('click', () => {
  //all figures are hidden before only displaying photos of the class of 'Apartments'
  hideAll();
  showByClass('Apartments');
});

//Event listener for "Hotels & Restaurants" button
filterVen.addEventListener('click', () => {
  //all figures are hidden before only displaying photos of the class of 'Hotels & restaurants'
  hideAll();
  showByClass('Hotels & restaurants');
});

//Event Listener for "All" button
filterAll.addEventListener('click', () =>{
  //shows restores the display properties of all elements
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

//function for populating the gallery with jobs from Backend
async function populateGallery(){
  //storing the retrieved data from getWorks inside of works
  const works = await getWorks();
  
  //this forEach function runs through every indexed
  works.forEach((work) =>{
    //these constants hold the newly created HTML elements (figures, images, and captions)
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figCaption = document.createElement('figcaption');

    //adds the image src and alt description from backend
    img.src = work.imageUrl;
    img.alt = work.title;
    //adds image titles from backend to all figures
    figCaption.textContent = work.title;
    //adds category names and id numbers from backend
    figure.className = work.category.name
    figure.id = work.id


    //incorporates the images and titles into the figures...
    //...before finally adding them into the gallery container
    figure.appendChild(img);
	  figure.appendChild(figCaption);
    galleryContainer.appendChild(figure);
  });
};

document.addEventListener('DOMContentLoaded', populateGallery);