create or replace procedure set_data(
  uid integer,
  edu_hist education[], 
  emp_hist employment[], 
  rel religion,
  gender gender,
  cont contact_details,
  description text
) 
as $$
declare
  inst_id integer;
  comp_id integer;
  edu education;
  emp employment;
begin
  if edu_hist is not null then
    delete from enrolls E where E.user_id = uid;
    foreach edu in array edu_hist loop
      select S.id 
      into inst_id 
      from schools S 
      where S.name = edu.institution 
        and S.country = edu.country 
        and S.state = edu.state 
        and S.city = edu.city;
      if inst_id is null then
        insert into schools(name, country, state, city) 
          values(edu.institution, edu.country, edu.state, edu.city) returning id into inst_id;
      end if;
      insert into enrolls(school_id, user_id, level, major, minor, subjects, from_date, to_date) values(
        inst_id, uid, edu.level, edu.major, edu.minor, edu.subjects, edu.from_date, edu.to_date
      )
      on conflict(school_id, user_id, level) do
      update set school_id = inst_id, user_id = uid, level =
        edu.level, major = edu.major, minor = edu.minor, subjects = edu.subjects,
        from_date = edu.from_date, to_date = edu.to_date;
    end loop;
  end if;

  if emp_hist is not null then
    delete from works W where W.user_id = uid;
    foreach emp in array emp_hist loop
      select C.id 
      into comp_id
      from companies C
      where C.name = emp.company; 
      if comp_id is null then
        insert into companies(name) 
          values(emp.company) returning id into comp_id;
      end if;
      insert into works values(
        uid, comp_id, emp.role, emp.description
      )
      on conflict(company_id, user_id, role) do
      update set company_id = comp_id, user_id = uid, role = emp.role, description = emp.description;
    end loop;
  end if;

  if rel is not null then
    update users set religion = rel where id = uid;
  end if;

  if gender is not null then
    update users set gender = set_data.gender where id = uid;
  end if;

  if cont is not null then
    delete from contacts where user_id = uid;
    insert into contacts values(uid, cont.country, cont.state, cont.city, cont.address, cont.phone);
    if cont.email is not null then
      update users set email = cont.email where id = uid;
    end if;
  end if;

  if description is not null then
    update users set description = set_data.description where id = uid;
  end if;
end;
$$ language plpgsql;

create or replace procedure set_data_end(
  user_id integer,
  edu_hist text, 
  emp_hist text, 
  rel text,
  gender gender,
  cont text,
  description text
) as $$
declare
  edu_hist_records education[];
  emp_hist_records employment[];
  religion_record religion;
  contact contact_details;
begin
  edu_hist_records := (select array(select json_populate_recordset(null::education, edu_hist::json)));
  emp_hist_records := (select array(select json_populate_recordset(null::employment, emp_hist::json)));
  religion_record := (select json_populate_record(null::religion, rel::json));
  contact := (select json_populate_record(null::contact_details, cont::json));
  call set_data(user_id, edu_hist_records,
    emp_hist_records, religion_record, gender, contact, description);
end;
$$ language plpgsql;

create or replace function get_data(
  uid integer
) returns biodata
as $$
declare
  r record;
  gend gender;
  edu_hist education[];
  emp_hist employment[];
  cont contact_details;
  rel religion;
  contact json;
  descr text;
begin
  select U.gender, U.religion, U.description into r from users U where U.id = uid;
  gend := r.gender;
  rel := r.religion;
  descr := r.description;

  select to_json(row(C.country, C.state, C.city, C.address, C.phone, U.email)::contact_details) into contact
    from users U inner join contacts C on U.id = C.user_id where C.user_id = uid;

  select array_agg(row(level, name, major, minor, subjects, awards, country,
      state, city, from_date, to_date)::education) into edu_hist from enrolls E inner join
    schools S on E.school_id = S.id where E.user_id = uid;

  select array_agg(row(role, name, description)::employment) into emp_hist from works W inner join
    companies C on W.company_id = C.id where W.user_id = uid;

  return(
    select row(gend, array_to_json(edu_hist)::text, 
      array_to_json(emp_hist)::text, (select to_json(contact)),
      (select to_json(rel)), descr)::biodata
  );
end;
$$ language plpgsql;
