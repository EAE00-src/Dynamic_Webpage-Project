// api link: 'http://localhost:5678/api/'
console.log("index.js")
/*fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.error(`There was an error: ${err}`)
    });*/

// fetch functions
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

//testing json data reference outside of function
/*getCateg().then(categories => {
  console.log(categories); // Access the first category's id
  console.log(categories[1].name); // Access the first category's name
}).catch(error => {
  console.error(error.message);
});*/

//this js file should get repurposed for the modal window that will fetch images from the backend to put in the admin
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
	
getCateg();
getWorks();

//getting backend jobs to replace the gallery prior to filtering
async function updateGallery(){
  const works = await getWorks();
  let galleryContainer = document.querySelector('.gallery');
  
  works.forEach((work, index) =>{
    const galleryFigure = galleryContainer.children[index];
	const figure = document.createElement('figure')
    const img = document.createElement('img');
    const figCaption = document.createElement('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title;
    galleryFigure.id = work.id
    galleryFigure.className = work.category.name

	figure.appendChild(img);
	figure.appendChild(figCaption);
	galleryContainer.appendChild(figure);
  });
};

document.addEventListener('DOMContentLoaded', updateGallery);




