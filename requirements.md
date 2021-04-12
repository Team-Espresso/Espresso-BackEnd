# Requirements

## What is the vision of this product?

>Our app is targeted at the movie lover who wants a place to keep track of movies they have watched or are interested in watching. They can add movies to their watchlist, add comments and star ratings to moveis they have watched and see what other users have watched.

## What pain point does this project solve?

>There are many places on the internet to find movie info, but most of them are bloated with features and ads. Our site will be a simple and elegant way to save movies to your watchlist, see if you've watched a movie and add comments and ratings.

## Why should we care about your product?

>Our app will help make your Friday night movie selection less painful by providing a place where you can see which movies you'be been wanting to watch. The amount of time and effort spent finding movies across multiple services can be arduous and our app will simplify that part of your weekend.

---

## Scope (In/Out)

### *In Scope*

- Users can view trending movies and tv shows. 
- Users can search for movies or shows based on genre.
- Users can add movies or shows to their watchlist.
- Users can add ratings and comments to media in their watchlist.

### *Out of Scope*

- Users will not be able to watch trailers from our app.
- Users will not be able to navigate directly to content player apps.
- Users will not be able to filter movies or tv shows.

---

## Functional Requirements

- As a user, I want to see trending movies so I can decide on a movie I want to watch.
- As a user I want to add movies to my watch list so I can come back later and see what I saved.
- As a user I want to browse movies based on Genre.
- As a user I want to add ratings and comments to a movie after I have watched it.
- As a user I want to login in to save my watch lists.
- As a user, I want to update my profile info.

---

## Data Flow

A user will be prompted to login to access the site through Auth0. Once they login, they will be presented with the home page and trending movies and tv shows, a search field and a button to view their Watchlist. If they click on Watchlist, they will be taken to a page that will show all of their saved movies and shows. They can navigate back to the home page by clciking on Home.

---

## Non-Functional Requirements

### Security

Users must login using Auth0 for authentication before authorization is granted for use of the features of our site. No sensitive data will be shared publicly, in searches or url's.

### Portability

Our app will be responsive for mobile and desktop.

### Usability

Our app will be simple and elegant with minimal features so that usability is high. We want to avoid clunky and bloated features that make the site more difficult to use.
