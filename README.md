# US Election Results by State and County :us:

## Dashboard that shares information about election results from 2000 - 2016 (5 elections).

## Team 15 Members:
---------------------
- Nathaniel Witte 
- Michael Hills 
- Stephanie Core


**Created with:**
- Flask
- Python
- pgAdmin 4


**Additional tools used:**
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

**Deployment:** Heroku

## Content:
-------------------
1. Leaflet Map of US (Leaflet choropleth, Mapbox, GeoJSON) - 
2. Plotly Line chart showing Year over Year elections results
3. County choropleth for selected State
4. Text Summarizaton for click event
5. About Page 


### GIT Steps
1. Clone the git repo on your desktop from git@github.com:Steff-C/Historical-Election-Results-by-State-and-County-from-1976-2020.git 
1. In ````, create a file named ``config.py`` in the same directory as ``alt_fuel.ipynb``, enter variables for your local postgres instance, and save the file:
    ```
    user='{YOUR USERNAME}'
    password='{YOUR PASSWORD}'
    port=5432
    address='localhost'
    database='ETL_db'
    ```

### pgAdmin Steps    
1. Open pgAdmin and create a new database ``ETL_db``
1. Open ``create_database.sql`` in PGAdmin and run the scripts to create the following tables:  
    - state_abbreviations
    - registrations
    - fuel_stations

### Jupyter Notebook Steps
1. Follow the steps to open Jupyter Notebook  in your environment in the ETL-Project directory. 
1. Open ``alt_fuel.ipynb``
1. Run all step in the notebook.

### pgAdmin
1. Return to pgAdmin and the file ``create_database.sql``.
1. Run the last SQL query marked ``FINAL SCRIPT:  TABLE JOIN``





<!-- <details>
 <summary>Created with:</summary>
<p> Flask, Python, pgAdmin 4 </p>
</details>
<details>
<summary> Additional tools used:</summary>
<p> D3.js, Plotly.js, Pandas, Leaflet, Mapbox, Javascript, CSS </p>
</details> -->