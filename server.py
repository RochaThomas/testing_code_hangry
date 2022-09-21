
from flask import Flask, render_template, redirect, session, request
app = Flask(__name__)
app.secret_key = "Secret secrets are no fun secret secrets hurt someone"

@app.route("/")
def testing_something():
    
    # in theory... axios call here to get data for places
    # then send places as a list to html page as a variable representing a list
    # use jinja code in the html file to display the respective information

    places = [
        {
            "name": "Fake Address",
            "address": "1234 Seasame Street, San Francisco, California 94016",
            "coords": { "lat": 37.3387, "lng": -121.8853 },
            "content": '<h1>Testing Testing</h1>',
            
        },
        {
            "name": "Another Fake Place",
            "address": "4321 Main Street, Sacramento, California 94203",
            "coords": { "lat": 37.7749, "lng": -122.4194 },
            "content": '<h1>Dirty City</h1>',
        },
        {
            "name": "Fake Las Vegas Place",
            "address": "5678 Sahara Lane, Las Vegas, Nevada 89139",
            "coords": { "lat": 36.9741, "lng": -122.0308 },
            "content": '<h1>Beach</h1>',
        },
    ];

    return render_template("index_testing.html", places = places)

@app.route("/process_form", methods=['POST'])
def process_form():
    session['form'] = request.form
    return redirect("/form_results")

@app.route("/form_results")
def disp_form_results():
    form = session['form']

    addresses = []
    for key in form:
        addresses.append(form[key])
        
    return render_template("testing_form_results.html", addresses=addresses)

if __name__ == "__main__":
    app.run(debug=True)

