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
	
getCateg();
getWorks();


/*getWorks().then(objects =>{
	console.log(objects[4].category.id);
}).catch(error =>{
	console.error(error);
});*/


//button variables
const filters = document.getElementsByClassName('filters');
const filterAll = document.getElementById('b-All');
const filterObj = document.getElementById('b-Obj');
const filterApt = document.getElementById('b-Apt');
const filterVen = document.getElementById('b-Ven');
//Gallery variable
let galleryContainer = document.querySelectorAll('.gallery');




//Event listeners (filters)
filterAll.addEventListener('click', async () =>{
	await getWorks().then(works =>{
		let allResults = [];
		for (let all of works){
			console.log(all);
		};
	});
});

//objects filter
filterObj.addEventListener('click', async () =>{
	await getWorks().then(obj =>{
		let results = [];

		for (let prop of obj){
			if(prop.category.name === 'Objects'){
				console.log(prop);
				results.push(prop);

				const objectSelect = galleryContainer.querySelector('.obj');
				const aptSelect = galleryContainer.querySelectorAll('.apt');
				const venueSelect = galleryContainer.querySelectorAll('.venue');

				objectSelect.style.display = 'inline-block';
				aptSelect.forEach(apt => apt.style.display = 'none');
				venueSelect.forEach(venSelect=> venSelect.style.display = 'none');
			}
	
		};
				console.log(results);
				console.log(categResults);
			//let 	
			//for (let i; i < results.length; i++ ){
			//for (let j = i; j < allCategories.length; j++){
			//	if(results[i].category.name === allCategories[j].name)
		});
	});

//apartments filter
filterApt.addEventListener('click', async() =>{
	await getWorks().then(apartments => {
		let aptResults = [];

		for(let apartment of apartments){
			if(apartment.category.name === 'Apartments'){
				aptResults.push(apartment);
				
			}
		};
		console.log(aptResults);
	});
});

//hotels & restaurants filter
filterVen.addEventListener('click', async () =>{
	await getWorks().then(venues => {
		let venResults = [];
		for(let prop of venues){
			if(prop.category.name === 'Hotels & restaurants'){
				venResults.push(prop);
				
			}
		};

		console.log(venResults[0].title);
	});
});
