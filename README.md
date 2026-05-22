# Text-to-Palette Analyzer

A creative tool that transforms written text into a unique, data-driven color palette. By analyzing the character distribution, Unicode diversity, and mathematical complexity (entropy) of your input, this application generates a visual "fingerprint" of your text.

## 🎨 How it Works

1.  **Text Analysis**: The app splits the input into individual characters and filters them based on your settings (whitespace, punctuation, etc.).
2.  **Entropy Calculation**: It computes the Shannon entropy to determine the complexity of the text.
3.  **Color Mapping**: Each character is mapped to a Hue based on its Unicode codepoint and a Saturation based on its frequency.
4.  **Clustering**: Similar colors are grouped into clusters using a weighted vector average, identifying the dominant "themes" of the text.
5.  **Visualization**: Results are presented through various charts:
    *   **Character Chart**: Frequency of each symbol.
    *   **Tile Chart**: Visual representation of character-color mappings.
    *   **Color Wheel**: A geometric view of color clusters and their relative strength.
    *   **Packed Cards**: Grouped characters showing how clusters are formed.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/al3xsus/text-to-palette.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### Building for Production

To create an optimized production build:
```bash
npm run build
```

## 🛠 Tech Stack

*   **React 19**: Modern UI development.
*   **TypeScript**: Static typing for robust code.
*   **Vite**: Fast development and build tool.
*   **Pure CSS**: Atomic and responsive styling without external libraries.
*   **ESLint**: Code quality and linting.

## 👤 Author

**Alexandr Lavrentyev**
*   Email: [al3xsus@pm.me](mailto:al3xsus@pm.me)
*   GitHub: [@al3xsus](https://github.com/al3xsus)
*   LinkedIn: [Alexandr Lavrentyev](https://www.linkedin.com/in/alexandr-lavrentyev/)
*   Website: [al3xsus.github.io](https://al3xsus.github.io/)

## 📜 License

This project is open-source and available under the MIT License.
