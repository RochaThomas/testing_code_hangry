
from flask import Flask, render_template, redirect, session, request
app = Flask(__name__)
app.secret_key = "Secret secrets are no fun secret secrets hurt someone"

@app.route("/")
def testing_something():
    return render_template("index_testing.html")

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

@app.route("/process_form", methods=['POST'])
def process_form():
    session['form'] = request.form
    return redirect("/form_results")

if __name__ == "__main__":
    app.run(debug=True)

