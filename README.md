# GameVault App


## Summary
The purpose of this app is to provide users with a platform to keep track of their gaming activities and manage their game collection. It allows users to organize and categorize their completed games, games in progress, and wishlist games. The app integrates with an external API to fetch comprehensive game data, including details such as release date, publisher, and genre. Users can also record additional stats and information about their gaming experiences, such as status, rating, and playtime. The app provides insights and statistics, allowing users to view their gaming habits and track their progress over time. Overall, the app aims to enhance the gaming experience by providing a centralized hub for managing and exploring one's gaming journey.

## Features
Game Collection Management: Keep a record of your game collection, including completed games, games in progress, and games on your wishlist.

Game Details and Integration: Fetch comprehensive game data from an external API, including details like release date, publisher, and genre. Stay up to date with the latest information on your favorite games.

Game Logging and Stats: Log your gaming progress, including status, rating, playtime, and other custom stats. Gain insights into your gaming habits and track your progress over time.

User Profiles: Create personalized user profiles to showcase your gaming preferences, bio, and avatar. Connect with other gamers and share your gaming experiences.

Search and Discovery: Explore a vast library of games and search for specific games. Discover new games to add to your collection.

Authentication and Security: Implement password protection and authentication to ensure the security of user accounts and data.

Error Handling and Validations: Implement robust error handling and validations to provide a smooth user experience and prevent data inconsistencies.

## Tech Stack
Frontend: The frontend of the app is built using React.js, utilizing React Router for client-side routing. 


Backend: The backend of the app is built using Ruby on Rails, providing a RESTful API to handle data storage and retrieval. The database is managed using PostgreSQL, ensuring data persistence and reliability.

Bootstrap: CSS framework for responsive web design. It provides a collection of pre-built components and styles that help enhance the visual appearance and responsiveness of the application.

External API Integration: The app integrates with an external API from IGDB to fetch game data, providing a seamless experience for users to access comprehensive information about their favorite games.


## External Dependencies

The following external dependencies are used in this project:

- Chart.js: A JavaScript library for data visualization. [Link to Chart.js documentation](https://www.chartjs.org/)

- IGDB API: An external API used to fetch game data. [Link to IGDB API documentation](https://www.igdb.com/api)
  

## Getting Started
To get started with the Game Tracker App, follow these steps:

1. Clone the repository: git clone <repository-url>
2. Install dependencies: npm install (for frontend) and bundle install (for backend)
3. Configure the environment variables for API access and database connection.
4. Run database migrations: rails db:migrate
5. Start the development server: npm start (for frontend) and rails s (for backend)
6. Access the app in your web browser at http://localhost:3000.

### Contributions and Feedback
Contributions, bug reports, and feature requests are welcome! If you have any feedback or suggestions to improve the Game Tracker App, please feel free to open an issue on the GitHub repository.