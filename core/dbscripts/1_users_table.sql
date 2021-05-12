create type religious_school as enum ('Hanafi', 'Shafei', 'Hanbali', 'Maliki', 'Other');
create type gender as enum('Male', 'Female');

create table users(
  id serial primary key,
  handle varchar(30) unique not null,
  firstname varchar(30),
  lastname varchar(30),
  email varchar(30) unique not null,
  password text not null,
  gender gender,
  school_of_thought religious_school,
  description text
);
