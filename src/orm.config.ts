import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  host: 'db',
  port: 5432,
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
