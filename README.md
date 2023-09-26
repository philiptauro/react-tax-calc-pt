# Points - Tax Calculator

This app has been built in response to the question posed by this task - [Interview Test Server](https://github.com/points/interview-test-server)


## To run the application
1. Download the application from Git
2. In Terminal, when navigated within the application folder, ```npm run dev```
3. For the application to run, you will need to have the docker file of the application running as that provides the backend of the application. Steps for the same are available on the Interview test server link above

## To test the application
1. To run the unit tests within Terminal,
   ```npm run test```

## Dev notes

The source code of the application resides in the **src** folder. For details of individual components, refer relevant files.

```
project
│   README.md   
└───src
│   │   __tests__
│   │   components
│   │   context
│   │   types
│   │   utils
│   │   App.tsx
│   
```

Here is a short description of the purposes of each

1. __\_\_tests\_\___ 
   
   Contains the tests pertaining to the various components. We are using jest as our test runner and react-test-library to provide the react environment during our tests

2. __components__
   
   Contains the components which are the visual building blocks of the application

3. __context__

   This folder is a store for all the Contexts that are in use in the application

4. __types__

   Contains all the classes, interfaces, and types for application

5. __utils__

   Contains all constants and other utilities such as urlGenerator