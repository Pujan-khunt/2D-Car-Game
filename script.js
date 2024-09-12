// "DOMContentLoaded" is activated when the HTML document is fully loaded
// so the first line just listens for that event and loads the js file

// Here the 'function(){...}' is called an 'Anonymous Function' as it doesn't have a name
// and is directly the part of the event listener
document.addEventListener("DOMContentLoaded", function () {
    // document.getElementById() will return the element from the HTML file 
    // with the specific id which is sent as an argument in the .getElementById() function
    // The variables car and car2 will help us modify, transform and rotate the styles
    const car = document.getElementById("car");
    const car2 = document.getElementById("car2");

    // Variable creation
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    let theta1 = 0, theta2 = 0;

    // The amount of pixels a car will move in each direction
    const forward_distance = 5;
    const backward_distance = 2;

    // a set is just like a array but doesn't store duplicate values
    // so if 'w' is pressed twice it will only store it once
    // In this case it will only store the keys pressed
    // eg. if w and a and again a are pressed then it will only store ['w', 'a']
    // Helps in registering input for multiple keys
    const keysPressed = new Set();

    // this function updates the transform properties(translate and rotate) for both cars
    function updateTransformations() {
        // Updates the x and y coordinates and rotation transformations
        car.style.transform = `translate(${x1}px, ${y1}px) rotate(${theta1}deg)`;
        car2.style.transform = `translate(${x2}px, ${y2}px) rotate(${theta2}deg)`;
    }

    // listens for a key press and calls the anonymous function which has event as the parameter
    // event --> it is an object that gets passed onto the function everytime a keydown event occurs
    // this object contains useful information like the specific key being pressed and if any modifier 
    // key is pressed like shift, ctrl etc.
    document.addEventListener('keydown', function(event){
        // event.key --> returns the information about the specific key being pressed
        // and adds it to the set 'keysPressed'
        keysPressed.add(event.key);

        // checks if this list contains the specific key which is pressed(registered)
        if(['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)){
            // Prevents scrolling whenever any of these are pressed
            event.preventDefault();
        }

        // NOTE: Here i have used if, else if, else if, else if and not if, if, if, if for w, a, s, and d key checks
        // the reason will be explained in their differences:

        // Method 1: if, else if, else if, else if
        // allows for only if block to get executed which means the key which is pressed the latest will execute

        // Method 2: if , if , if , if
        // allows for multiple if blocks to get executed which means the cars can move diagonally

        // Movement for car1 --> W, A, S, D
        if (keysPressed.has('w')) {
            theta1 = 270;
            y1 -= forward_distance;
        }
        else if (keysPressed.has('s')) {
            theta1 = 90;
            y1 += backward_distance;
        }
        else if (keysPressed.has('a')) {
            theta1 = 180;
            x1 -= forward_distance;
        }
        else if (keysPressed.has('d')) {
            theta1 = 0;
            x1 += forward_distance;
        }

        // Movement for car2 (Arrow Keys)
        if (keysPressed.has('ArrowUp')) {
            theta2 = 270;
            y2 -= forward_distance;
        }
        else if (keysPressed.has('ArrowDown')) {
            theta2 = 90;
            y2 += backward_distance;
        }
        else if (keysPressed.has('ArrowLeft')) {
            theta2 = 180;
            x2 -= forward_distance;
        }
        else if (keysPressed.has('ArrowRight')) {
            theta2 = 0;
            x2 += forward_distance;
        }
        
        // calls the function responsible for transforming the styles of the car after updating the values
        updateTransformations();

        // the code call the handlemovement function in the next animation frame which allows much smoother animation to take place
        // rather than reacting instantly
        requestAnimationFrame(handleMovement);
    });
    
    // as soon as the key which was pressed is released it will get deleted from the set of keysPressed
    document.addEventListener('keyup', function(event){
        // Removes the key registered from the set
        keysPressed.delete(event.key);
    });
});
