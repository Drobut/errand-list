import * as _crypto from 'crypto';
import * as sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/mock.db', sqlite3.OPEN_READWRITE, err => {
  if (err) return console.error(err.message);
  console.log('connection successuful');
});

db.run(
  'CREATE TABLE IF NOT EXISTS users(id, username, email, password, cards)'
);

export function insertInto(secrets: string) {
  const hash = _crypto.createHmac('sha256', secrets).digest('hex');
  db.run(
    'INSERT INTO users( id, username, email, password, cards)VALUES(1,TESTE,TESTE@TESTE,' +
      hash +
      ',TESTE)'
  );
}

db.close(err => {
  if (err) return console.error(err.message);
});
