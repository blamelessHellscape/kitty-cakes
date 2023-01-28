import sqlite3

conn = sqlite3.connect('database.db')
print("Opened database successfully")

conn.execute('CREATE TABLE cats (name TEXT, amount NUMBER)')
print ("Table created successfully")

cur = conn.cursor()
cur.execute('insert into cats (name, amount) values ("maple", 0)')
cur.execute('insert into cats (name, amount) values ("apricot", 0)')
conn.close()