
from flask import Flask, render_template, redirect, session, request
app = Flask(__name__)
app.secret_key = "Secret secrets are no fun secret secrets hurt someone"

@app.route("/")
def testing_something():
    if 'lat' in session and 'lng' in session:
        lat = float(session['lat'])
        lng = float(session['lng'])
    else:
        lat = 37.3387
        lng = -121.8853
    return render_template("index_testing.html", lat=lat, lng=lng)

@app.route("/form_results")
def disp_form_results():
    form = session['form']
    print(form)

    places = []
    for key in form:
        places.append(form[key])
        
    return render_template("testing_form_results.html", places=places)

@app.route("/testing_autocomplete")
def disp_testing_autocomplete():
    return render_template("testing_autocomplete.html")

@app.route("/testing_user_location")
def disp_testing_user_location():
    return render_template("testing_user_location.html")

@app.route("/testing_manual_entry")
def disp_testing_manual_entry():
    return render_template("manual_entry.html")

@app.route("/process_form", methods=['POST'])
def process_form():
    session['form'] = request.form
    return redirect("/form_results")

@app.route("/process_user_location", methods=['POST'])
def process_user_location():
    session['lat'] = request.form['lat']
    session['lng'] = request.form['lng']
    return redirect("/")

@app.route("/process_manual_entry", methods=['POST'])
def process_manual_entry():
    # probably need to edit this part a bit
    # maybe have a onclick function on a fake submit button
    # that will set the value of a hidden input named user_location
    session['lat'] = request.form['lat']
    session['lng'] = request.form['lng']
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)

