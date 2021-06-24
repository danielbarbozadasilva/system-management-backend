
const nodeenvironment = process.env.NODE_ENV || "development"

if (nodeenvironment === "development") {
  require('dotenv').config()
}  // Verifica se existe, em caso afirmativo ele remove 


module.exports = {
  uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`
}


// module.exports = {
//   uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`
//   }; 

  

