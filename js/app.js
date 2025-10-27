import { categories } from './constants.js';


// Application state
let currentCategory = null;
let shuffledCards = [];
let currentCardIndex = 0;
let isFlipped = false;

// DOM elements
const categorySelector = document.getElementById('categorySelector');
const flashcardContainer = document.getElementById('flashcardContainer');
const loadingState = document.getElementById('loadingState');
const navigation = document.getElementById('navigation');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const cardCounter = document.getElementById('cardCounter');
const viewAllButton = document.getElementById('viewAllButton');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const cardsTable = document.getElementById('cardsTable');
const cardsTableBody = document.getElementById('cardsTableBody');
const closeButton = document.getElementById('closeButton');

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createFlashcard(card) {
    const flashcardElement = document.createElement('div');
    flashcardElement.className = 'flashcard';
    flashcardElement.id = 'flashcard';

    flashcardElement.innerHTML = `
            <div class="card-face card-front">
                <div class="card-type">Question</div>
                <div class="card-content"></div>
            </div>
            <div class="card-face card-back">
                <div class="card-type">Answer</div>
                <div class="card-content"></div>
            </div>
        `;

    // Set content using innerHTML to render HTML properly
    const frontContent = flashcardElement.querySelector('.card-front .card-content');
    const backContent = flashcardElement.querySelector('.card-back .card-content');

    frontContent.innerHTML = card.key;
    backContent.innerHTML = card.value;

    return flashcardElement;
}

function updateCardCounter() {
    const total = shuffledCards.length;
    const current = currentCardIndex + 1;
    cardCounter.textContent = `${current} / ${total}`;
}

function showCard() {
    if (shuffledCards.length === 0) return;

    const card = shuffledCards[currentCardIndex];

    // Clear container and append the new flashcard element
    flashcardContainer.innerHTML = '';
    const flashcardElement = createFlashcard(card);
    flashcardContainer.appendChild(flashcardElement);

    // Reset flip state
    isFlipped = false;

    // Add click listener to new card
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', toggleFlip);

    // Update counter
    updateCardCounter();

    // Update button states
    // Navigation wraps around
    prevButton.disabled = false;
    nextButton.disabled = false;
}

function toggleFlip() {
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped', isFlipped);
    }
}

function goToPreviousCard() {
    if (shuffledCards.length === 0) return;

    // Wrap around: if at first card, go to last card
    if (currentCardIndex > 0) {
        currentCardIndex--;
    } else {
        currentCardIndex = shuffledCards.length - 1;
    }
    showCard();
}

function goToNextCard() {
    if (shuffledCards.length === 0) return;

    // Wrap around: if at last card, go to first card
    if (currentCardIndex < shuffledCards.length - 1) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
    showCard();
}

function showTableView() {
    if (!currentCategory) return;

    // Set modal title
    modalTitle.textContent = `All "${currentCategory.name}" Cards`;

    // Clear and populate table
    cardsTableBody.innerHTML = '';

    currentCategory.cards.forEach(card => {
        const row = document.createElement('tr');

        const englishCell = document.createElement('td');
        englishCell.innerHTML = card.key;

        const hindiCell = document.createElement('td');
        hindiCell.innerHTML = card.value;

        row.appendChild(englishCell);
        row.appendChild(hindiCell);
        cardsTableBody.appendChild(row);
    });

    // Show modal
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function hideTableView() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
}

function selectCategory(categoryName) {
    // Find the selected category
    currentCategory = categories.find(cat => cat.name === categoryName);

    if (!currentCategory) {
        // Hide flashcard and navigation if no category selected
        flashcardContainer.innerHTML = '<div class="loading">Choose a category to start studying</div>';
        navigation.style.display = 'none';
        viewAllButton.style.display = 'none';
        return;
    }

    // Shuffle the cards for this category
    shuffledCards = shuffleArray(currentCategory.cards);
    currentCardIndex = 0;

    // Show the first card
    showCard();

    // Show navigation and view all button
    navigation.style.display = 'flex';
    viewAllButton.style.display = 'block';
}

// Initialize the app
function initializeApp() {
    // Populate category dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelector.appendChild(option);
    });

    // Add event listeners
    categorySelector.addEventListener('change', (e) => {
        selectCategory(e.target.value);
    });

    prevButton.addEventListener('click', goToPreviousCard);
    nextButton.addEventListener('click', goToNextCard);
    viewAllButton.addEventListener('click', showTableView);
    closeButton.addEventListener('click', hideTableView);

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideTableView();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Handle Escape key to close modal
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            e.preventDefault();
            hideTableView();
            return;
        }

        // Regular navigation only works when modal is not open
        if (modalOverlay.style.display === 'flex') return;
        if (shuffledCards.length === 0) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                goToPreviousCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToNextCard();
                break;
            case ' ': // Spacebar
            case 'Enter':
                e.preventDefault();
                toggleFlip();
                break;
        }
    });
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Register service worker after all other scripts
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
