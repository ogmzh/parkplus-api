import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  host: 'localhost',
  port: 5432,
  username: 'parkplusadmin',
  password: 'parkplusadmin',
  type: 'postgres',
  database: 'parkplus',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
};

export default config;

export const AppDataSource = new DataSource(config);
