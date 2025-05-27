// api link: 'http://localhost:5678/api/categories'
console.log("app.js")
/*fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.error(`There was an error: ${err}`)
    });*/
    async function getData() {
	const apiCateg = 'http://localhost:5678/api/categories';
		try {
		const response = await fetch(apiCateg);
			if (!response.ok){
				throw new Error(`Response status: ${response.status}`)
			}
			
            const json = await response.json();
            console.log(json);
	     }catch (error) {
            console.error(error.message);
		  }
	};
getData();
console.log(getData());