# Final Movies

Final Movies is a React SPA for browsing movies and TV series. It features a filter for easy searching, detailed pages for each movie or show, and smooth navigation using React Router. The app includes loading skeletons, toast notifications for error handling, and a responsive design for a seamless user experience.

## Features

- Fetches movie and TV series data from an external API using an API key.
- Filtering functionality to easily find movies or TV shows.
- Detailed pages for each movie or TV show with relevant information.
- Popular movies section implemented with Swiper carousel.
- Loading skeletons (react-loading-skeleton) to improve perceived performance while data loads.
- Error notifications using react-toastify for a better user experience.
- State management with React Context API.
- Fully responsive layout, optimized for various devices.

## Technologies Used

- React
- React Router DOM
- React Context API
- Swiper (carousel)
- react-loading-skeleton
- react-toastify
- Vite (build tool)
- CSS Modules

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- API key for the movie database API (please add your key to `.env` file as `VITE_API_KEY`).

### Installation

Clone the repository:
git clone https://github.com/TAMUNA-CHKOIDZE/Final-Movies.git
cd Final-Movies

Install dependencies:
npm install

Create a .env file in the root directory and add your API key:
VITE_API_KEY=your_api_key_here

Run the development server:
npm run dev

Build and Deploy
To create a production build and deploy:
npm run build
npm run deploy

Folder Structure
Brief overview of the folder structure:
/src/components - reusable UI components (Header, Footer, Layout, etc.)
/src/pages - page components for different routes (Home, Catalog, MovieDetails, TvSeries, NotFound)
/src/context - React Context for state management
/src/routes - React Router setup
/src/assets - images, styles, and other static assets
/src/api - api functions
/src/utils - genre id to name mapping


If you have any questions or suggestions, feel free to open an issue or contact me!