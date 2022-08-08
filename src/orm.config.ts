import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  // use for docker
  // host: 'db',
  // port: 5432,

  // use for local
  host: 'localhost',
  port: 5431,

  username: 'parkplusadmin',
  password: 'parkplusadmin',
  type: 'postgres',
  database: 'parkplusdb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
};

export default config;

export const AppDataSource = new DataSource(config);
