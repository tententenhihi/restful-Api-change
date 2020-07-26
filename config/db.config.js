module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "King7799@@",
   //PASSWORD: "",
    DB: "fakedevice",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };