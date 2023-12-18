import pg from 'pg';

class PostgresProvider {

  pool: pg.Pool;

  constructor() {
    const sslOptionsOn ={
      rejectUnauthorized: false,
      ca: process.env.POSTGRES_CA
    };
    const sslOptionsOff = false;

    const sslOptions = process.env.ENVIRONMENT === 'production'? sslOptionsOn: sslOptionsOff;

    const pgOptions = {
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
