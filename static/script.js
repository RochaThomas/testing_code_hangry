
// javascript functions that will run the map
// google maps api key AIzaSyApYkTOlVGaCHsdFi6DFG3JwH4y272RH1M

places = [
    {
        name: "Fake Address",
        address: "1234 Seasame Street, San Francisco, California 94016",
        coords: { lat: 37.3387, lng: -121.8853 },
        content: '<h1>Testing Testing</h1>',
        
    },
    {
        name: "Another Fake Place",
        address: "4321 Main Street, Sacramento, California 94203",
        coords: { lat: 37.7749, lng: -122.4194 },
        content: '<h1>Dirty City</h1>',
    },
    {
        name: "Fake Las Vegas Place",
        address: "5678 Sahara Lane, Las Vegas, Nevada 89139",
        coords: { lat: 36.9741, lng: -122.0308 },
        content: '<h1>Beach</h1>',
    },
];

var markers = []

function initMap() {
    
    const icon = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        scaledSize: new google.maps.Size(25, 25),
        anchor: new google.maps.Point(0,25),
    }

    /** 
    * This location should be centered on the users input location
    * home, work, friend's house, etc.
    * right now it is centered on San Jose for demonstration purposes\
    * the users location would be input by them and would come from a call
    * to the database to retrieve users information or 
    * maybe it would come from the html page as a hidden input...
    * maybe a security issue doing it the second way 
    */
    const defaultLocation = { lat: 37.3387, lng: -121.8853 };

    // center the map on the default location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: defaultLocation,
    });

    // add marker function
    let prevWindow = false;

    const addMarker = (place) => {
        const marker = new google.maps.Marker({
            position: place.coords,
            map: map,
            address : place.address,
            icon: icon,
            added: false,
        })
        
        const infoWindow = new google.maps.InfoWindow({
            content: ""
        })

        infoWindow.setContent(place.content);
        
        marker.addListener("mouseover", function(){
            if (prevWindow){
                prevWindow.close()
            }

            prevWindow = infoWindow;
            infoWindow.open(map, marker);
        });
        markers.push(marker)
    }


    for (let i = 0; i < places.length; i++){
        addMarker(places[i]);
    }
}

window.initMap = initMap;

// testing reaction and information passing
/**
 * might run into a small problem here
 * when you have the icon reacting to the addToList Function
 * and then the user comes back to hover over the list it might change the marker
 * icon back to the flag...
 * maybe avoid this by having a boolean value in marker such as "added"
 * and then have an if statement to check if added is true or false
 * based on the bool value alter the object in markers[i].setIcon()
 */

// not sure why but it doesn't like these variables
// "google is not defined"

// let unadded = {
//     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//     scaledSize: new google.maps.Size(25, 25),
//     anchor: new google.maps.Point(0,25),
// }

// let unaddedBig = {
//     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//     scaledSize: new google.maps.Size(35, 35),
//     anchor: new google.maps.Point(0,35),
// }

// let added = {
//     url: "/static/checkPin.png",
//     scaledSize: new google.maps.Size(25, 25),
//     anchor: new google.maps.Point(0,25),
// }

// let addedBig = {
//     url: "/static/checkPin.png",
//     scaledSize: new google.maps.Size(35, 35),
//     anchor: new google.maps.Point(0,35),
// }

const iconReaction = (address) => {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].address == address) {
            if (markers[i].added){
                markers[i].setIcon({
                    // addedBig
                    url: "/static/checkPin.png",
                    scaledSize: new google.maps.Size(35, 35),
                    anchor: new google.maps.Point(0,35),
                })
            }
            else {
                markers[i].setIcon({
                    // unaddedBig
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: new google.maps.Size(35, 35),
                    anchor: new google.maps.Point(0,35),
                })
            }
        }
    }
}

const iconUndoReaction = (address) => {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].address == address) {
            if (markers[i].added){
                markers[i].setIcon({
                    // added
                    url: "/static/checkPin.png",
                    scaledSize: new google.maps.Size(25, 25),
                    anchor: new google.maps.Point(0,25),
                })
            }
            else {
                markers[i].setIcon({
                    // unadded
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: new google.maps.Size(25, 25),
                    anchor: new google.maps.Point(0,25),
                })
            }
        }
    }
}


/**
 * this function will alter a markers "added" boolean attribute
 * to true or false so the icons can react properly
 * but on the html side
 * all of the restaurants will have checks...
 * or some sort of input handler so that the list can
 * be sent to the back end
 */
const addToFavs = (address) => {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].address == address) {
            if (markers[i].added){
                markers[i].added = false
                markers[i].setIcon({
                    // unaddedBig
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: new google.maps.Size(35, 35),
                    anchor: new google.maps.Point(0,35),
                })
            }
            else {
                markers[i].added = true
                markers[i].setIcon({
                    // addedBig
                    url: "/static/checkPin.png",
                    scaledSize: new google.maps.Size(35, 35),
                    anchor: new google.maps.Point(0,35),
                })
            }
        }
    }
}

// find a way to see the data from the form
// this kind of works...
// you can see all the worked out html but not the submission
// we need to see the submission to see how we will access it
// for posting to a database
// for loop or access by id
// if you access by id will it even work?
// how would you know what is clicked and what is not clicked
// const showMeTheData = (listForm) => {
//     var data = document.getElementById(listForm);
//     console.log(data.outerHTML);
// }