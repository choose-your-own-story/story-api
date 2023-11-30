import pg from 'pg';

class PostgresProvider {

  pool: pg.Pool;

  constructor() {
    let sslOptionsOn ={
      rejectUnauthorized: false,
      ca: process.env.POSTGRES_CA
    };
    let sslOptionsOff = false;

    let sslOptions = process.env.ENVIRONMENT === 'production'? sslOptionsOn: sslOptionsOff;

    let pgOptions = {
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
      ssl: sslOptions
    };
    this.pool = new pg.Pool(pgOptions);
  }

  instance() {
    return this.pool;
  }
}

export default PostgresProvider;
