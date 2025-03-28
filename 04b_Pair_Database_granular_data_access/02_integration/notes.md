
# første del - forbind

jeg blev oplyst en ip adresse, som jeg kunne tilgå, da min teammate havde tilladt port adgang gennem deres router.

Personen havde valgt "postgres" database.

(Jeg har valgt ikke at upload det første billede jeg tog, da det indeholder min teammates gobale ip adresse.)

Jeg skulle anskaffe mig et "psql" commandline værktøj, for at forbinde til serveren.

jeg tilføjet stien til min miljø værdier, så jeg kunne starte det fra min terminal.

dette var den command jeg kørte for at forbinde til min teammates server.

```
psql -h xx.xx.xxx.xxx -p 5432 -U limited_user -d postgres
```
så hvis vi skal forklare den kode, vil det se sådan her ud.
- program : psql
- -h : host ip adresse
- -p : port vi snakker igennem
- -d : database vi bruger

-----

# nu er vi inde

med "help" kan vi se hvilke commands vi har til rådigehed.

![Alt text](./Pasted%20image%2020250307203751.png)

jeg læser også i min teammates beskrivelse, at jeg skal bruge "\dt" til at se tablerne.

![Alt text](./Pasted%20image%2020250307204718.png)

her er flere af de oplysninger jeg har fået af vide.

user 1
username: postgres
password: yourpassword

\dt - show all tables

\dv - show all views

read command : 
SELECT * FROM TABLENAME;

# table over hvad jeg fandt frem til

dette var hvad jeg fandt frem til, gennem min undersøgelse af min teammates database.


| name           | type  | owner    | adgang                    | ikke adgang               |
| -------------- | ----- | -------- | ------------------------- | ------------------------- |
| guests         | table | postgres |                           | read, delete, update, add |
| items          | table | postgres | read, add, update, delete |                           |
| persons        | table | postgres |                           | read, add, delete,update  |
| secrets        | table | postgres |                           | read, delete, update, add |
| guests_limited | view  | postgres | read                      | add, delete, insert       |
| person_limited | view  | postgres | read                      | add, delete, insert       |

# billeder fra min undersøgelse

- select fra persons og secrets "permission denied".
- select fra guests_limited "allowed".
![Alt text](./Pasted%20image%2020250307212337.png)

- select fra person_limited "allowed".

![Alt text](./Pasted%20image%2020250307212446.png)

- insert into person "permission denied".

![Alt text](./Pasted%20image%2020250307212745.png)

- insert into items "allowed".

![Alt text](./Pasted%20image%2020250307212920.png)

- update items "allowed".

![Alt text](./Pasted%20image%2020250307213336.png)

- delete items "allowed".

(jeg mangler billedet, så du må tag mit ord for det)

----

- selected from person_limited "allowed"
- delete from persons "permission denied".
- delete from person_limited "permission denied".

![Alt text](./Pasted%20image%2020250307213731.png)

- (indeholder det samme data fra forrige billede også)
- update from guests_limited "permission denied".
- delete from guests_limited "permission denied".
- delete from guests "permission denied".

![Alt text](./Pasted%20image%2020250307214338.png)

- insert into guests "permission denied".

![Alt text](./Pasted%20image%2020250307214713.png)