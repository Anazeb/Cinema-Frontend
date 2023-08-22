# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Component Division:
- The code is divided into pages (placed in page folder) which utilizes the components(placed in components folder.)
- Movie.jsx: This component is responsible for generating a list of links to booking pages for movie screenings. Each link displays the movie's title, poster image, and screening time.
The home page uses the screening list component.
- ScreeningList.jsx: This component groups movie screenings by date and renders a list of movies for each date, using the Movie component to display the details of each movie.
- formatMovieLength: This converts a movie's length from minutes to hrs and minutes.
- HomePage.jsx: This filters the list of movies based on the selected category and then renders the ScreeningsList component with the filtered movies.
- useScreenings.js: This fetches and filters screenings data from an API based on the movieId parameter in the current URL. It returns the filtered screenings data as a state variable.
- CheckAdjacentSeats: it checks if the seats in the input array are adjacent and in the same row
 - DisplaySeats.jsx: responsible for fetching and displaying information about occupied and available seats for a specific screening. It also handles user interaction with the seats for booking purposes
 - BookingPage.jsx: This component is responsible for fetching and displaying movie details and screenings information. It also provides an interface for users to select seats for booking.
 - TicketSelection.jsx: This fetches and displays ticket types for a selected screening. It provides an interface for users to select tickets for booking and calculates the total number and value of the selected tickets.
 - Receipts.jsx: It displays a receipt for a movie booking. The receipt includes the booking number, date and time of the screening, total value of the booking, and selected seats.
 - generateBookingNumbers.jsx: This generates a booking number consisting of three random uppercase letters followed by three random digits and returns a string.
 - Header: This component displays a header with the site logo, a "Home" button, and a category filter (if the current page is the homepage). It allows users to navigate to the homepage and change the category filter for movie listings. If one clicks the logo, the user is also taken to the home page.
 - Filter.jsx:  it fetches and displays a dropdown list of movie categories allowing the users to select a category and notifies the parent component of the selection through the onCategoryChange prop.
 - Footer:  displays a simple footer with the text "© Feature Flicks 2023". It is being used to provide copyright information at the bottom of the web page.
