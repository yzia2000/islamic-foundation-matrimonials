create or replace
function array_transport(all_items anyarray) returns setof text
 returns null on null input
language plpgsql   as
$$
declare
  item  record;
begin
foreach   item  in array all_items
loop
   return next(to_json(item)::text);
   end loop;
end;
$$;

create or replace
function array_transport_agg(all_items anyarray) returns setof json
 returns null on null input
language plpgsql   as
$$
declare
  item  record;
  agg   text;
begin
foreach   item  in array all_items
loop
   return next(to_json(item));
   end loop;
end;
$$;
