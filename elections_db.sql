Create table election_data (
	index int primary key,
	"Year" INT   NOT NULL,
    "State" VARCHAR   NOT NULL,
    "State_Abbr" VARCHAR   NOT NULL,
    "County" VARCHAR   NOT NULL,
    "Office" VARCHAR   NOT NULL,
    "Candidate" VARCHAR   NOT NULL,
	"Party" VARCHAR NOT NULL,
    "Candidate_Votes" INT NOT NULL,
    "Total_Votes_byCounty" INT NOT NULL
);

select * from election_data;
-- drop table election_data;

Create table state_election_data (
	index int primary key,
	"Year" INT   NOT NULL,
    "State" VARCHAR   NOT NULL,
    "State_Abbr" VARCHAR   NOT NULL,
    "Office" VARCHAR   NOT NULL,
    "Candidate" VARCHAR   NOT NULL,
    "Candidate_Votes" INT NOT NULL,
    "Total_Votes_by_State" INT NOT NULL,
	"Party" VARCHAR NOT NULL
);
select * from state_election_data;
-- drop table state_election_data;