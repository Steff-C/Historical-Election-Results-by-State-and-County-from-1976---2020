CREATE TABLE "election_data" (
    "year" INT   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "state_po" VARCHAR   NOT NULL,
    "county" VARCHAR   NOT NULL,
    "office" VARCHAR   NOT NULL,
    "candidate" VARCHAR   NOT NULL,
	"party" VARCHAR   NOT NULL,
    "candidate_votes" INT   NOT NULL,
    "total_votes_county" INT NOT NULL
);

select * from election_data;

drop table election_data;

create table election_data (
	index int primary key,
	year INT   NOT NULL,
    state VARCHAR   NOT NULL,
    state_po VARCHAR   NOT NULL,
    county VARCHAR   NOT NULL,
	FIPS VARCHAR   NOT NULL,
    office VARCHAR   NOT NULL,
    candidate VARCHAR   NOT NULL,
	party VARCHAR   NOT NULL,
    candidate_votes INT   NOT NULL,
    total_votes_county INT NOT NULL,
	version INT NOT NULL
);

select * from election_data;