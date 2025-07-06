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
            //console.log(works); //console will show the array of works from the backend
			return works;
	     }catch (error) {
            console.error(error.message);
		  }
};
async function getCateg(){
	const apiCateg = 'http://localhost:5678/api/categories';
		try {
		const response = await fetch(apiCateg);
			if (!response.ok){
				throw new Error(`Response status: ${response.status}`)
			}else{
			
            const categData = await response.json();
			//console.log(categData); //console will show the array of categories from backend
			return categData;
			};
	     }catch (error) {
            console.error(error.message);
		  }
};

//function for populating the gallery with jobs from Backend
async function populateGallery(){
  //storing the retrieved data from getWorks inside of works
  const works = await getWorks();
  
  //this forEach function runs through every indexed job retrieved
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
    galleryContainer.appendChild(figure);
    figure.appendChild(img);
	  figure.appendChild(figCaption);
    

    //This section of code is responsible for updating the modal gallery view with content from backend
    const modalGallery = document.querySelector('.modal-gallery');
    const modalFigure = document.createElement('figure');
	  const modalImg = document.createElement('img');
    const deleteBtn = document.createElement('button');
    const deleteImg = document.createElement('img');
    
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-button';
    deleteBtn.ariaLabel = 'delete-img';

    deleteImg.className = 'trash-icon';
    deleteImg.src = 'assets/icons/delete_svg.svg';

    deleteBtn.appendChild(deleteImg);

    modalImg.src = work.imageUrl;
    modalImg.alt = work.title;
    modalImg.className = 'modal-img';

    modalFigure.className = work.category.name;
    modalFigure.id = work.id;
    //adds new images into the currently existing figures that hold the delete buttons
    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(deleteBtn);
    modalFigure.appendChild(modalImg);

    //deleteBtn listener to send DELETE requests to the backend and removes respective DOM elements  
    deleteBtn.addEventListener('click', async() =>{
      const id = work.id;
      const deleteApi = `http://localhost:5678/api/works/${id}`;
      const loginToken = localStorage.getItem('login-token');


      try {
          const response = await fetch(deleteApi, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${loginToken}`
            }
          });
          if(response.ok){
            modalFigure.remove(); //removes the figure element from modal
            if(figure) figure.remove(); //removes the figure from the main gallery
            console.log(`Deleted work: ${id}`)
            alert("Deletion successful!");
          }else{
            const errorData = await response.json();
            console.error (`Failed to delete: ${errorData}`);
            alert('Deletion failed. Please try again!')
          }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting item.');
      }
    });

  });
};

document.addEventListener('DOMContentLoaded', populateGallery);


//admin profile (login verified)
const logoutBtn = document.getElementById('logout-btn');
const loginBtn = document.getElementById('login');
const editMode = document.getElementById('edit-mode');
//modal-related event listeners & variables
const openEditModal = document.getElementById('open-modal');
const closeModal1 = document.querySelector('#exit-button1');
const closeModal2 = document.querySelector('#exit-button2');
const backButton = document.getElementById('back-button');
const modalWindow = document.querySelector('#modal-window');
const modalOne = modalWindow.querySelector('.modal-1');
const modalTwo = modalWindow.querySelector('.modal-2');
const addPhotoBtn = modalOne.querySelector('#add-button');
const addFile = document.getElementById('add-file');
//modal-2 related variables
const photoForm = document.getElementById('photo-form');
const categorySelect = document.getElementById('category-select');
const submitWorkBtn = document.getElementById('submit-photo');


openEditModal.addEventListener('click', () =>{
	modalWindow.showModal();
	modalOne.style.display = 'flex';
  modalOne.style.flexDirection = 'column';
	modalTwo.style.display = 'none';
});
//closes the modal from the first loaded page
closeModal1.addEventListener('click', () =>{
  const preview = document.getElementById('preview-image');
	modalWindow.close();
  photoForm.reset();
  preview.src = '';
  preview.style.display = 'none';
});
//closes the modal on the second page
closeModal2.addEventListener('click', () =>{
  const preview = document.getElementById('preview-image');
	modalWindow.close();
  photoForm.reset();
  preview.src = '';
  preview.style.display = 'none';
});
//closes the modal dialog when clicked outside of its area
modalWindow.addEventListener('click', (area) =>{
  const preview = document.getElementById('preview-image');

  if(area.target === modalWindow){
    preview.src = '';
    preview.style.display = 'none';
    modalWindow.close();
  }
});
//This event Listener listens for the Esc key input to close the modalWindow
document.addEventListener('keydown', (action) => {
  if (action.key === 'Escape' && modalWindow.open) {
    dialog.close();
    photoForm.reset();
  }
});


//opens modal 2 to add photos
addPhotoBtn.addEventListener('click', () =>{
	modalOne.style.display = 'none';
	modalTwo.style.display = 'block';
});
//returns to modal 1 to gallery view
backButton.addEventListener('click', () =>{
	modalTwo.style.display = 'none';
	modalOne.style.display ='block';
});
//dynamically populates the selectable options for the category dropdown
async function populateCategorySelection() {
	const categories = await getCateg();

	categories.forEach((category) =>{
		const categoryOption = document.createElement('option');
		categoryOption.value = category.id;
		categoryOption.textContent = category.name;
		categorySelect.appendChild(categoryOption);
	});
}



//this function deletes the login-token from localStorage, refreshes the page, and removing the edit button
function logOutfunc(){
	//removes token(s) from localStorage upon clicking Logout
	localStorage.removeItem('login-token');
	localStorage.removeItem('token');
  //takes the user out of 'editing mode' and reloads the page to show change
  openEditModal.style.display = 'none';
  openEditModal.setAttribute('disabled', 'disabled');
  logoutBtn.style.display = 'none';
  loginBtn.style.display = 'block';
  location.reload();
}
logoutBtn.addEventListener('click', logOutfunc);

//this event listener checks the user's localStorage to see if they have a valid token...
//...before adjusting the index page's html elements
document.addEventListener('DOMContentLoaded', () =>{
  function verifyAdmin(){
    const loginToken = localStorage.getItem('login-token');

    //checks if the user has a valid token
    if(loginToken === undefined || loginToken === null || loginToken === ''){
	    return false
    }else{
	    return true
    }
  };
	
	if(verifyAdmin() === true){
    editMode.style.visibility = 'visible';
		openEditModal.style.display = 'block';
		logoutBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    openEditModal.removeAttribute('disabled');
    populateCategorySelection();
	}else if(verifyAdmin() === false || verifyAdmin() === undefined || verifyAdmin() === null || verifyAdmin() === ''){
    openEditModal.style.visibility = 'collapse';
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    editMode.style.display = 'none';
  }
  console.log(verifyAdmin());
});


//Event Listener for submitting content to the gallery's backend
photoForm.addEventListener('submit', async (event) =>{
  event.preventDefault();

  async function sendWorks() {
    const imageInput = document.getElementById('add-file');
    const titleInput = document.getElementById('title-input');
    const categoryInput = document.getElementById('category-select');
    const preview = document.getElementById('preview-image');


    if (!imageInput.files.length) {
      alert('Please select a photo.');
      return;
    }

    if (!titleInput.value.trim()) {
      alert('Please enter a title.');
      return;
    }

    if (!categoryInput.value) {
      alert('Please select a category.');
      return;
    }

    const photoFormData = new FormData();

    photoFormData.append('image', imageInput.files[0]);
    photoFormData.append('title', titleInput.value.trim());
    photoFormData.append('category', parseInt(categoryInput.value));
    const loginToken = localStorage.getItem('login-token');

    const postApi = 'http://localhost:5678/api/works'
      try {
        const response = await fetch(postApi, {
          method: 'POST',
          body: photoFormData,
          headers: {'Authorization': `Bearer ${loginToken}`},
        });

        if (!response.ok){
          throw new Error(`Upload failed with status ${response.status}`);
        }
          const result = await response.json();
          console.log('Upload successful:', result);
          alert('New work uploaded successfully!');

          photoForm.reset();
          preview.src = '';
          preview.style.display = 'none';
          submitWorkBtn.classList.remove('confirm');
          location.reload();
        
      } catch (error){
        console.error(error);
        alert(`Failure to upload photo, please try again: ${result.message || result}`);
      }
  }
  sendWorks();
});
//Event Listener for when all form inputs have content ready to be sent
photoForm.addEventListener('change', (eve) => {
  eve.preventDefault();
  const imageInput = document.getElementById('add-file');
  const titleInput = document.getElementById('title-input');
  const categoryInput = document.getElementById('category-select');

  const isImageSelected = imageInput.files.length > 0;
  const isTitleFilled = titleInput.value.trim() !== "";
  const isCategoryChosen = categoryInput.value !== "";

  if (isImageSelected && isTitleFilled && isCategoryChosen) {
    submitWorkBtn.classList.add('confirm');
  } else {
    submitWorkBtn.classList.remove('confirm'); // Optional: remove class if incomplete
  }
});
//previews the image that the user is attempting to upload
addFile.addEventListener('change', () =>{
  const file = addFile.files[0];
  const preview = document.getElementById('preview-image');

  if (file && file.type.startsWith('image/')){
    const reader = new FileReader(); 
    reader.onload = (ev) =>{
      preview.src = ev.target.result;
      preview.style.display = 'block';
      console.log(reader);
    };
    reader.readAsDataURL(file);
  }else{
    preview.src = '';
    preview.style.display = 'none';
  }
});

