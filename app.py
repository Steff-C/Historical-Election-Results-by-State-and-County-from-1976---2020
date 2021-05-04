from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

#Parameters from Config.py
from config import password 
from config import user

# Define the database connection parameters
database_name = 'election_db' 
connection_string = f'postgresql://{user}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table = base.classes.election_data

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage


@app.route("/electionresults")
def TotalResults():
    ''' Query the database for fighter aircraft and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.Year, table.State, table.Party, table.County, table.Candidate_Votes).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_results = []
    for year, state, party, county, candidate_votes in results:
        dict = {}
        dict["year"] = year
        dict["state"] = state
        dict["party"] = party
        dict["county"] = county
        dict["votes"] = candidate_votes
        all_results.append(dict)

    # Return the jsonified result. 
    return jsonify(all_results)

@app.route("/electionresults/<state>")
def StateResults(state):
    ''' Query the database for fighter aircraft and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.Year, table.State, table.Party, table.County, table.Candidate_Votes).filter(table.State==state)
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_results = []
    for year, state, party, county, candidate_votes in results:
        dict = {}
        dict["year"] = year
        dict["state"] = state
        dict["party"] = party
        dict["county"] = county
        dict["votes"] = candidate_votes
        all_results.append(dict)

    # Return the jsonified result. 
    return jsonify(all_results)

@app.route("/electionresults/<state>/<year>")
def StateYearResults(state, year):
    ''' Query the database for fighter aircraft and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.Year, table.State, table.Party, table.County, table.Candidate_Votes).filter(table.State==state).filter(table.Year==year)
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_results = []
    for year, state, party, county, candidate_votes in results:
        dict = {}
        dict["year"] = year
        dict["state"] = state
        dict["party"] = party
        dict["county"] = county
        dict["votes"] = candidate_votes
        all_results.append(dict)

    # Return the jsonified result. 
    return jsonify(all_results)
# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)