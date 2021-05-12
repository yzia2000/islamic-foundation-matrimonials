create or replace procedure set_data(
  uid integer,
  edu_hist education[], 
  emp_hist employment[], 
  rel_school religious_school,
  gender gender,
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
      insert into enrolls values(
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

  if rel_school is not null then
    update users set school_of_thought = rel_school where id = uid;
  end if;

  if gender is not null then
    update users set gender = set_data.gender where id = uid;
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
  rel_school religious_school,
  gender gender,
  description text
) as $$
declare
  edu_hist_records education[];
  emp_hist_records employment[];
begin
  edu_hist_records := (select array(select json_populate_recordset(null::education, edu_hist::json)));
  emp_hist_records := (select array(select json_populate_recordset(null::employment, emp_hist::json)));
  call set_data(user_id, edu_hist_records,
    emp_hist_records, rel_school, gender, description);
end;
$$ language plpgsql;
