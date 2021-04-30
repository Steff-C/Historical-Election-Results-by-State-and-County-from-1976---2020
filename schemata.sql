CREATE TABLE "election" (
    "year" INT   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "state_po" VARCHAR   NOT NULL,
    "county" VARCHAR   NOT NULL,
    "FIPS" INT   NOT NULL,
    "office" VARCHAR   NOT NULL,
    "candidate" VARCHAR   NOT NULL,
	"party" VARCHAR   NOT NULL,
    "candidatevotes" INT   NOT NULL,
    "totalvotes" INT NOT NULL,
    "version" INT NOT NULL
);

select * from election;