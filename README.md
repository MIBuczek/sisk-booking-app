<a name="readme-top"></a>

<!-- LOGO AND DEMO -->
<div align="center">
    <img src="src/assets/images/logo_footer.png" alt="Logo" width="auto" height="80">
    <br />
    <h3 align="center">SISK BOOKING TOOL</h3>
    <br />
    <p align="center">
        <a href="https://sisk-booking-tool.netlify.app/#/" target="_blank"><strong>Demo Page</strong></a>
    </p>
</div>

<!--TABLE OF CONTENT LIST -->

<div align="left">
<h3>Table of Content</h3>
    <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built Stack</a></li>
        <li><a href="#built-with">File structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

The application is designed to administer the booking of sports facilities in the municipality. The system has two panels, a general user and an administrator. Users can send a request for hourly reservations for a particular facility and space on the facility. The administrator can accept or reject reservations. Administrators have 3 levels of access according to their position.

Views available:

-  Calender - all reservation visible on week graphic view.
-  Reservations - table with all reservations per city and building.
-  Clients - table view of all save clients data.
-  Buildings - selected building information with basic info and available list of employee
-  Summary - option to generate selected client reservation summary per time and building.

<!-- BUILD STACK -->

### Built With

-  ![React][React.js]
-  ![Redux][Redux]
-  ![TypeScript][TypeScript]
-  ![StyleComponents][StyleComponents]
-  ![ReactHookForm][ReactHookForm]
-  ![Husky][Husky]
-  ![ReactIcon][ReactIcons]

<!-- FILE STRUCTURE -->

### File Structure

```
├── .husky
├── build
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   └── organisms
│   ├── hooks
│   ├── models
│   ├── providers
│   ├── store
│   ├── style
│   ├── theme
│   ├── utils
│   └── views
│       ├── admin-view
│       └── user-view
├── .dockerignore
├── .env
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .jshintrc
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
├── storage.rule
└── tsconfig


```

<!-- GETTING STARTED -->

## Getting Started

To install and fire up the project, you will need a database created in google firebase and the addition of firebase-const.ts.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-  node & npm
   ```sh
   https://nodejs.org/en (version 16 and higher)
   ```

<!-- INSTALLATION -->

### Installation

_The following instruction allows you to launch the application locally, but for full use of the application you will need to do a few more steps. It is also possible to run the application as a docker image._

1. Create account on [https://firebase.google.com/](https://firebase.google.com/)
2. Create project - web application project
3. Clone the repo
   ```sh
   git clone https://github.com/MIBuczek/sisk-booking-app
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Run application
   ```sh
   npm start
   ```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact Me

-  [Linkedin](https://www.linkedin.com/in/miczelbuczek/)
-  [Email](michalbuczek@hotmail.com)
-  [GitHub Profile](https://github.com/MIBuczek)

<p align="center">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Redux]: https://img.shields.io/badge/Redux-764abc?style=for-the-badge&logo=redux&logoColor=white
[TypeScript]: https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[StyleComponents]: https://img.shields.io/badge/StyleComponents-palevioletred?style=for-the-badge&logo=stylecomponents&logoColor=pink
[ReactHookForm]: https://img.shields.io/badge/ReactHookForm-20232A?style=for-the-badge&logo=reactHookForm&logoColor=ec5990
[Husky]: https://img.shields.io/badge/Husky-42b983?style=for-the-badge&logo=husky&logoColor=pink
[ReactIcons]: https://img.shields.io/badge/ReactIcons-e91e63?style=for-the-badge&logo=ReactIcons&logoColor=white
