function openImage(image) {

    let lightbox = document.getElementById("lightbox");

    let largeImage = document.getElementById("largeImage");

    largeImage.src = image.src;

    lightbox.style.display = "flex";
}


function closeImage() {

    let lightbox = document.getElementById("lightbox");

    lightbox.style.display = "none";
}