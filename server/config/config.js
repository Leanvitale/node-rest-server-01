process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const urlDB = ( process.env.NODE_ENV !== 'dev' )  ? 'mongodb://localhost:27017/cafe'
                                                : 'mongodb+srv://admin:1m19xKVQUJM1mkkl@cluster0.opcyv.mongodb.net/cafe';

process.env.URLDB = urlDB;

