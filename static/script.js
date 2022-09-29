
// javascript functions that will run the map
// google maps api key AIzaSyApYkTOlVGaCHsdFi6DFG3JwH4y272RH1M

// try number two
//  ---------------------

function initMap(){
    // icon used for creating markers on the map
    const icon = {
        url: "/static/checkPin.png",
        scaledSize: new google.maps.Size(25, 25),
        anchor: new google.maps.Point(0,25),
    }

    const sj = { lat: 37.3387, lng: -121.8853 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: sj,
    });

    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: sj,
        radius: 500,
        type: "restaurant"
    };

    const callback = (results, status) => {
        console.log(results);

        // get the html list
        let listOfPlaces = document.getElementById("places");

        // setting prevWindow for onhover window display handling
        let prevWindow = false;

        // check if the response from the request is okay
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            places = results;

            for (const place of places) {
                if (place.geometry && place.geometry.location){
                    const marker = new google.maps.Marker(
                        {
                            position: place.geometry.location,
                            map: map,
                            icon: icon,
                        }
                    );

                    const infoWindow = new google.maps.InfoWindow({content: place.name});
                    marker.addListener("mouseover", () => {
                        if (prevWindow){
                            prevWindow.close()
                        }

                        prevWindow = infoWindow;
                        infoWindow.open(map, marker);
                    });

                    const inputContainer = document.createElement("div");
                    inputContainer.class = "input-container";
                    listOfPlaces.appendChild(inputContainer);

                    const placeInput = document.createElement("input");
                    const labelPlaceInput = document.createElement("label");

                    placeInput.type = "checkbox";
                    placeInput.checked = true;
                    placeInput.id = place.place_id;
                    placeInput.classList.add("selected");
                    placeInput.name = place.place_id;
                    placeInput.value = place.name;
                    labelPlaceInput.htmlFor = place.place_id;
                    labelPlaceInput.textContent = place.name;

                    inputContainer.appendChild(placeInput);
                    inputContainer.appendChild(labelPlaceInput);

                    inputContainer.addEventListener("mouseover", () => {
                        bigSize = new google.maps.Size(35, 35);
                        bigAnchor = new google.maps.Point(0, 35);
                        marker.setIcon({
                            ...marker.icon,
                            scaledSize: bigSize,
                            anchor: bigAnchor,
                        });
                    });

                    inputContainer.addEventListener("mouseout", () => {
                        smallSize = new google.maps.Size(25, 25);
                        smallAnchor = new google.maps.Point(0, 25);
                        marker.setIcon({
                            ...marker.icon,
                            scaledSize: smallSize,
                            anchor: smallAnchor,
                        });
                    });

                    placeInput.addEventListener("click", () => {
                        if (placeInput.classList.contains("selected")) {
                            marker.setIcon({...marker.icon, 
                                url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                            });
                            placeInput.classList.add("unselected");
                            placeInput.classList.remove("selected");
                        }
                        else if (placeInput.classList.contains("unselected")) {
                            marker.setIcon({...marker.icon, 
                                url: "/static/checkPin.png",
                            });
                            placeInput.classList.add("selected");
                            placeInput.classList.remove("unselected");
                        }
                    });
                }
            }

            const submitButton = document.createElement("input");
            submitButton.type = "submit";
            submitButton.value = "Submit Selected Restaurants";
            listOfPlaces.appendChild(submitButton);

        }
    }

    service.nearbySearch(request, callback);
    
}

window.initMap = initMap;