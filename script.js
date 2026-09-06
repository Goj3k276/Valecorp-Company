function toggleMenu() {

    const menu = document.getElementById("navLinks");

    menu.classList.toggle("active");

}


function toggleAccordion(button) {

    const content = button.nextElementSibling;

    if (content.style.display === "block") {

        content.style.display = "none";

        button.querySelector("span").textContent = "+";

    } else {

        content.style.display = "block";

        button.querySelector("span").textContent = "−";

    }

}