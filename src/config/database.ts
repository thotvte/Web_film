import 'dotenv/config';
import migrations from '../database/migrations';
import entities from '../entities';

export default () => ({
  database: {
    type: process.env.TYPEORM_CONNECTION || 'mysql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: process.env.TYPEORM_PORT || 3306,
    username: process.env.TYPEORM_USERNAME || 'root',
    password: process.env.TYPEORM_PASSWORD || '123123123',
    database: process.env.TYPEORM_DATABASE || 'webmovies',
    entities: entities,
    migrations: migrations,
    synchronize: false,
    debug: true,
  },
});
