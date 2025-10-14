# FlashCards
A clean, minimalistic flashcard web application for language learning and study purposes.

## Features

### Core Functionality
- **Multiple Categories**: Dropdown selector to choose from different flashcard categories
- **Interactive Flashcards**: Click anywhere on a card to flip between question and answer
- **Random Shuffle**: Cards are randomly shuffled when a category is selected
- **Navigation**: Previous/Next buttons for easy card navigation with wrap-around functionality
- **Table View**: "View All" button to see all flashcards in a tabular format

### Mobile Optimization
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Cross-Platform**: Works seamlessly on iOS and Android browsers
- **Offline Ready**: Runs locally without internet connection required

### Language Learning Features
- **Multi-Script Support**: Handles both romanized text and native scripts (e.g., [translate:देवनागरी])
- **HTML Content**: Supports line breaks and formatting in flashcard content
- **Large Text**: Optimized font sizes for easy reading of vocabulary

## Categories Included

### Verbs (Hindi)
- 65 common Hindi verbs with English translations
- Romanized pronunciation + [translate:देवनागरी] script
- Essential vocabulary for Hindi language learners

### Present Tense
- Coming Soon

### Present Continuous Tense
- Coming Soon

### Past Tense
- Coming Soon

### Past Continuous Tense
- Coming Soon

### Future Tense
- Coming Soon

## Usage Instructions

### Getting Started
1. Open `index.html` in any modern web browser
2. Select a category from the dropdown menu
3. Cards will be automatically shuffled and ready for study

### Flashcard Mode
- **View Question**: The front of each card shows the key/question
- **Flip Card**: Click anywhere on the card to reveal the answer
- **Navigate**: Use "Previous" and "Next" buttons to move between cards
- **Wrap-Around**: Navigation cycles from last card back to first

### Table View Mode
- **Access**: Click the "View All" button next to the category dropdown
- **Overview**: See all flashcards in a two-column table format
- **Sticky Header**: Column headers remain visible while scrolling
- **Mobile Optimized**: 90% × 90% viewport for maximum content viewing
- **Return**: Click "Close" to return to flashcard mode

## Technical Specifications

### Viewport Sizes
- **Flashcards**: 90% width with balanced height
- **Table Modal**: 90% width × 90% height for maximum content area

### Browser Compatibility
- Modern web browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers on iOS and Android
- No external dependencies required

### File Structure
```
flashcard-app/
├── index.html          # Main application file
├── README.md          # This documentation
└── (embedded CSS/JS)   # Styling and functionality
```

## Customization

### Adding New Categories
To add new flashcard categories, modify the `categories` array in the JavaScript section:

```javascript
{
    name: "Your Category Name",
    cards: [
        { key: "Question 1", value: "Answer 1" },
        { key: "Question 2", value: "Answer 2" },
        // Add more cards...
    ]
}
```

### HTML Content Support
Values can include HTML for formatting:
```javascript
{ key: "Example", value: "Line 1<br><br>Line 2" }
```

## Features in Detail

### Random Shuffle Algorithm
- Cards are shuffled using the Fisher-Yates algorithm
- New random order generated each time a category is selected
- Ensures varied study sessions

### Responsive Design
- CSS Grid and Flexbox for layout
- Viewport meta tag for proper mobile scaling
- Touch-friendly button sizes (minimum 44px)
- Adaptive font sizes for readability

### Table View Features
- **Sticky Header**: Headers remain visible during scroll
- **Uniform Padding**: Consistent spacing on all sides
- **HTML Rendering**: Proper display of formatted content
- **Mobile Scrolling**: Optimized for touch scrolling

## Performance
- **Lightweight**: Pure HTML/CSS/JavaScript with no external dependencies
- **Fast Loading**: Single file architecture
- **Memory Efficient**: Client-side data storage in JavaScript objects
- **Smooth Animations**: CSS transform-based card flipping

## Accessibility
- High contrast colors for readability
- Large touch targets for mobile interaction
- Clear visual hierarchy and typography
- Keyboard navigation support (where applicable)

## Development Notes
- Built with vanilla HTML, CSS, and JavaScript
- No build process or external libraries required
- Cross-platform compatibility tested
- Optimized for both portrait and landscape orientations

## License
This application is provided as-is for educational and personal use.

---

**Perfect for**: Language learning, vocabulary building, exam preparation, interview practice, and general study purposes.
