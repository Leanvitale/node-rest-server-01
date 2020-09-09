process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const urlDB = ( process.env.NODE_ENV === 'dev' )    ? 'mongodb://localhost:27017/cafe'
                                                    : process.env.MONGO_URI;

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24;
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

process.env.URLDB = urlDB;

