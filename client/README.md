# GameVault App


## Summary

GameSaga allows users to keep track of their gaming activities and also allow them to manage their game collection. You can organize and categorize the game status by Complete, Abandoned, In Progress, and Wishlist. The app integrates with an external API from IGDB to fetch game data such as release date, publisher, genre, etc. The app also records additional stats and information about the users gaming experiences like current status, rating, and playtime. It provides insights and statistics that allows users to view their gaming habits. This app aims to enhance the gaming experience by providing a centralized hub for managing and exploring ones game journey.

## Features
• Game Collection Management: Users will have a game library that keeps track of games added as well as their current play status of that game.
• Game Details and Integration: Game data is fetched from an external API, IGDB that shows The game, aggregated rating, genre, description and much more. 
• Game Logging and Stats: Users are able to visually the amount of games as well as each status in a bar graph. And the different genres in their library using a Pie Chart.
• User Profiles: Users are able to showcase their game genre preference, bio and include an avatar. 
• Search and View Game Details: Search from a library of games by scrolling and flipping through the pages or typing a specific keyword in the search bar. If the user is interested in the game, they can add it to their library.
• Authentication and Security: Implement password protection and authentication to ensure the security of user accounts and data.
• Error Handling and Validations: Implement robust error handling and validations to provide a smooth user experience and prevent data inconsistencies.

## Tech Stack
• Frontend: The frontend of the app is built using React.js, utilizing React Router for client-side routing. 
• Backend: The backend of the app is built using Ruby on Rails, providing a RESTful API to handle data storage and retrieval. The database is managed using PostgreSQL, ensuring data persistence and reliability.
• External API Integration: The app integrates with an external API to fetch game data, providing a seamless experience for users to access comprehensive information about their favorite games.
• Deployment: The app is fully deployed and hosted on a cloud platform such as Render, ensuring accessibility and availability to users.

## Getting Started
To get started with the Game Tracker App, follow these steps:

1. Clone the repository.
2. Install dependencies: npm install (for frontend) and bundle install (for backend)
3. Configure the environment variables for API access and database connection.
4. Run database migrations: rails db:migrate db:seed
5. Start the development server: npm start (for frontend) and rails s (for backend)
6. Access the app in your web browser at http://localhost:3000.