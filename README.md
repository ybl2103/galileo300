# galileo300
The companion software for G.A.L. elevator controllers.

## Backend
#### Simple Start Up
This application uses the Django framework for the backend. To launch the app, simply enter the command "python mange.py runserver" 
in the root directory. Click the IP address printed to the terminal, and the webpage should open in your default browser. 

#### Websocket Testing
To test the websocket capabilities, you must first boot up a Redis server on your machine. Then, start the application as outlined
above. To test remote commands, open another terminal and launch the comsTester.py file. From the terminal in which you ran comsTester.py,
you can act as the elevator controller and send data updates to the web browser. The backend implementation for this can be found under
"js/packet.js". There you can find the all available commands that have been since implemented. 

## Frontend
#### Django Templates
The navigation bar and the sidebar elements are mainly implemented with direct HTML programming. The Galileo 3.0 uses the Django inject 
function to recycle the common elements between each webpage in the sidebar. So far, only the Group Monitor screen has been fully 
implemented. 

#### Javascript Implementations
The elements on the Group Monitor screen are dynamically rendered. The HTML template for the Group Monitor screen calls a JSON file from
the Databases folder as a reference for how to build the interface components. The JSON file is a description of the specific job the
Galileo 3.0 is representing. The information in the JSON file includes the number of floors, the number of elevators, and the types of
elevators in the building. The Group Monitor template then calls a method which then calls other methods in a cascading fashion, all of 
which are stored across various .js files. The majority of the legwork is written in the "js/util.js" file. The button implementations are 
stored in the "js/button.js" file. 

Prior to the implementation of live updates and complete controller to browser communications, I wrote a simple animation function in the 
"js/elevMov.js" that would simulate the motion of the elevator icon. Originally, it was made so that when the user clicks a button, the
elevator icon would move up and down in the shaft in response. The implementation is incredibly rudimentary and strictly for visual,
demonstrational purposes, as such it can only handle one call at a time. 

#### CSS Styling
The element styling is mainly based off of the Bootstrap CSS library with some adjustments. In addition to the Bootstrap CSS library, I 
also created custom elements to better fit the needs of the application, all of which can be found under "css/galElements.css". For 
aesthetic purposes, I have also integrated the [Simple-Scrollbar](https://github.com/buzinas/simple-scrollbar) plugin. 
