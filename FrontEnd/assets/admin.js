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
  
  works.forEach((work, index) =>{
    const figure = galleryContainer.children[index];
    const img = figure.querySelector('img');
    const figCaption = figure.querySelector('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title;
  });
};

//modal-related event listeners
