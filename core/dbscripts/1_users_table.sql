create type religious_school as enum ('Hanafi', 'Shafei', 'Hanbali', 'Maliki', 'Other');
create type gender as enum('Male', 'Female');

create type religion as (
  school religious_school
);

create table users(
  id serial primary key,
  handle varchar(30) unique not null,
  firstname varchar(255),
  lastname varchar(255),
  email varchar(255) unique not null,
  password text not null,
  gender gender,
  religion religion,
  description text
);

create table contacts(
  user_id integer primary key references users(id),
  country varchar(20) not null,
  state varchar(20) not null,
  city varchar(20) not null,
  address text,
  phone varchar(10)
);
