const peopleContainer = document.querySelector('.peoples');
const people = peopleContainer.querySelectorAll('.people');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const currentPageSpan = document.getElementById('current-page');

let currentPage = 1;
let visiblePeople = 3; // Number of people to display at a time

function updateDisplay() {
    const screenWidth = window.innerWidth;
console.log(screenWidth)
    // Adjust the number of visible items based on screen width
    if (screenWidth <= 1595) {
        visiblePeople = 1;
    } else {
        visiblePeople = 3;
    }


    const startIndex = (currentPage - 1) * visiblePeople;
    const endIndex = Math.min(startIndex + visiblePeople, people.length);

    // Hide all people
    people.forEach(person => {
        person.style.display = 'none';
    });

    // Show the selected range of people
    for (let i = startIndex; i < endIndex; i++) {
        people[i].style.display = 'block';
    }

    const totalPages = Math.ceil(people.length / visiblePeople);
    currentPageSpan.textContent = `${currentPage}/${totalPages}`;

    // Disable left button on first page, right button on last page
    leftButton.disabled = currentPage === 1;
    rightButton.disabled = currentPage === totalPages;

    // Change button styles based on current page
    leftButton.style.backgroundColor = currentPage === 1 ? '#ffffff' : ''; // Change background color to white if on first page
    leftButton.style.color = currentPage === 1 ? 'black' : ''; // Change text color to black if on first page
    rightButton.style.backgroundColor = currentPage === totalPages ? '#ffffff' : ''; // Change background color to white if on last page
    rightButton.style.color = currentPage === totalPages ? 'black' : ''; // Change text color to black if on last page
}

leftButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateDisplay();
    }
});

rightButton.addEventListener('click', () => {
    const totalPages = Math.ceil(people.length / visiblePeople);
    if (currentPage < totalPages) {
        currentPage++;
        updateDisplay();
    }
});

// Update display when the window is resized
window.addEventListener('resize', () => {
    updateDisplay();
});

// Call initially to set up the display
updateDisplay();
