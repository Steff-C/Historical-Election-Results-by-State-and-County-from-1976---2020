# US Election Results by State and County :us:

## Dashboard that shares information about election results from 2000 - 2016 (5 elections).

## Team 15 Members:
---------------------
- Nathaniel Witte 
- Michael Hills 
- Stephanie Core



**Tools used:**
- Flask
- Python
- pgAdmin 4
- ETL 
- Jupyter Notebook
- HTML
- D3.js
- Plotly.js
- Pandas
- Leaflet 
- Mapbox 
- Javascript
- CSS 
- Bootstrap

**Deployment:** Local Server.  Will set up on elephantSQL in the future.

## Content:
-------------------
1. Leaflet Map of US (Leaflet choropleth, Mapbox, GeoJSON) 
2. Plotly Line chart showing Year over Year elections results
3. County choropleth for selected State
4. Text Summarizaton for click event
5. About Page 


### GIT Steps - follow the order and instructions as noted below
1. Clone the git repo on your desktop:
https://git@github.com:Steff-C/Historical-Election-Results-by-State-and-County-from-1976-2020.git 
1. In ``Historical-Election-Results-by-State-and-County-from-1976-2020``, create a file named ``config.py`` in the same directory as ``Election.ipynb``, enter variables for your local postgres instance, and save the file:
    ```
    user='{YOUR USERNAME}'
    password='{YOUR PASSWORD}'
    port=5432
    host='localhost'
    database='elections_db'
    ```
1. In  ``Historical-Election-Results-by-State-and-County-from-1976-2020``, create a file named ``config.js`` in the JS directory along with the other ``.js`` files, enter the API for Mapbox, and save the file:     
    ```
    MapboxAPI = '{YOUR MAPBOX API}'
    ```
### pgAdmin Step 1
1. Open pgAdmin, click on Object in the toolbar and create a new database ``elections_db``
1. Open ``elections_db.sql`` in PGAdmin and run the scripts to create the following tables:  
    - ``election_data``
    - ``state_election_data``

### Jupyter Notebook Steps Part 1
1. Follow the steps to open Jupyter Notebook in your environment in the ``Historical-Election-Results-by-State-and-County-from-1976-2020`` directory
1. Open ``Election.ipynb``
1. Run all step in the notebook EXCEPT for THE LAST 2 lines identified below:
    - election_data_df.to_sql(name='election_data', con = engine, if_exists='append', index=True)
    - state_election_data_df.to_sql(name='state_election_data', con = engine, if_exists='append', index=True)

### pgAdmin Step 3
1. Return to pgAdmin and open the file ``elections_db.sql``
1. Run the SQL queries marked ``election_data`` and ``state_election_data``

### Jupyter Notebook Steps Part 2
1. Return to Jupyter Notebook and run the last two lines:
    - election_data_df.to_sql(name='election_data', con = engine, if_exists='append', index=True)
    - state_election_data_df.to_sql(name='state_election_data', con = engine, if_exists='append', index=True)

### pgAdmin Step 4
- Return to pgAdmin and open the file ``elections_db.sql``
- Run the following in a query and verify that the tables loaded:
    - select * from election_data;
    - select * from state_election_data;

### Once you have confirmed that the tables loaded, save and close pgAdmin and restart and clear all out put in the Jupyter Notebook

### Launch Dashboard
1. Right-click on the cloned repo folder ``Historical-Election-Results-by-State-and-County-from-1976-2020`` and then open a Git Bash (Windows) or Terminal (Mac)
2. Run ``source activate PythonData``
3. copy the http://000.0.0:000, paste into your chrome browser and have fun!
