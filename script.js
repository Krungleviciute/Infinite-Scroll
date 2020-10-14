
const imageConatiner = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

let initialCount = 5;
const count = 20;
const apiKey = 'GEqLqnezeKTSHR207ATWNrqmkmKWgayOHYqQEi6KJbM'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

const loadedImage = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

const setAttributes = (element, attributes) => {
    for( const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Creating html elements for each fetched photo and add to the DOM
const displayPhotos = () => {
    imagesLoaded = 0
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const anchorTag = document.createElement('a');
        const image = document.createElement("img")

        setAttributes(anchorTag, {
            href: photo.links.html,
            target: "_blank"
        })

        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        image.addEventListener('load', loadedImage);

        anchorTag.appendChild(image);
        imageConatiner.appendChild(anchorTag);
    });
}

const getPhotosFromAPI = async () => {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(count) 
            isInitialLoad = false 
        } 
    } catch(err){
        console.log(err)
    }
}

//Check if scrolling is near the bottom of the page to Load more Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotosFromAPI()
    }
})

//On Load
getPhotosFromAPI();





