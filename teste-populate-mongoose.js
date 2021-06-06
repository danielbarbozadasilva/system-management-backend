const mongoose = require("mongoose");
const db = require('./db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { produto, categoria } = require('./api/models/index');

const init = async () => {

  try {
    // const result = await produto.find({}).populate('categoriaid');
    const result = await categoria.findById('60b77e0a4539b11caa5df071')


    result.populate('produtos');

    console.log(result.toJSON());
 
  } catch (error) {

    console.log(error);

    throw error;

  }

}


init();
