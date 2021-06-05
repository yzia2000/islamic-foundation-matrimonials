create type education_level as enum ('Primary', 'Secondary', 'Undergraduate', 'Postgraduate', 'Other');

create type education as (
  level education_level, 
  institution varchar(20),
  major varchar(20),
  minor varchar(20),
  subjects varchar(20)[],
  awards varchar(20)[],
  country varchar(20),
  state varchar(20),
  city varchar(20),
  from_date date,
  to_date date
);

create type contact_details as (
  country varchar(20),
  state varchar(20),
  city varchar(20),
  address text,
  phone varchar(10),
  email varchar(255)
);

create type list_data as (
  current_page integer,
  data json,
  max_pages integer
);

create type employment as (
  role varchar(20), 
  company varchar(20), 
  description text
);

create type biodata as (
  id integer,
  firstname varchar(255),
  lastname varchar(255),
  gender gender,
  "educationHistory" json, 
  "employmentHistory" json, 
  contact json,
  religion json,
  description text
);

create table schools(
  id serial primary key,
  name varchar(20) not null,
  country varchar(20),
  state varchar(20),
  city varchar(20),
  unique(name, country, state, city)
);

create table enrolls(
  school_id integer references schools(id) not null,
  user_id integer references users(id) not null,
  level education_level not null,
  major varchar(20),
  minor varchar(20),
  subjects varchar(20)[],
  awards varchar(20)[],
  from_date date,
  to_date date,
  primary key(school_id, user_id, level)
);

create table companies(
  id serial primary key,
  name varchar(30) not null
);

create table works(
  user_id integer references users(id),
  company_id integer references companies(id),
  role varchar(20) not null,
  description text,
  primary key(user_id, company_id, role)
);
