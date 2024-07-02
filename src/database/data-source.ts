import database from '../config/database';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceConfig = database().database as DataSourceOptions;

export default new DataSource(dataSourceConfig);
