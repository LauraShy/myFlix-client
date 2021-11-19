# **myFlix App Client Side**

## **Objective**

To create the client-side component of a movie web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

---

## **Essential Views and Features**

#### **Login View**
- Allows users to log in with a username and password
- Option to go to the Registration View

#### **Registration View**
- Allows users to log in with a username and password
- Option to go to the Login View

#### **Main View**
- Returns a list of ALL movies to the user (displaying an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

#### **Movie View**
- Returns data (image, description, genre, director) about a single movie to the user
- Allows users to add a movie to their list of favorites
- Option to learn more about the movie via the Genre and Director views

#### **Genre View**
- Returns data about a genre, with a name and description

#### **Director View**
- Returns data about a director (name, bio, birth year, death year)

#### **Profile view**
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister

---

## **Built with**

- Visual Studio Code
- React
- React-Bootstrap
- React-Redux

---

## **Dependencies**

- "axios": "^0.21.1"
- "img": "^3.0.3"
- "moment": "^2.29.1"
- "p": "^0.2.0"
- "parcel-bundler": "^1.12.5"
- "path": "^0.12.7"
- "prop-types": "^15.7.2"
- "public": "^0.1.5"
- "react": "^17.0.2"
- "react-bootstrap": "^1.6.1"
- "react-dom": "^17.0.2"
- "react-r": "^2.0.0-rc02"
- "react-redux": "^7.2.5"
- "react-router-dom": "^5.2.1"
- "redux": "^4.1.1"
- "redux-devtools-extension": "^2.13.9"
- "s": "^1.0.0"
- "src": "^1.1.2"

---

### **How to run the app locally**
To build the project in the terminal, run `parcel src/index.html`  
Open webpage and use, `http://localhost:1234/`
