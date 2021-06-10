const mongoose = require("mongoose");
const db = require('../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { produto, categoria, fornecedor } = require('../api/models/index');

const init = async () => {

  try {
      const [forncedorFromDB, categoriaFromDB] = await Promise.all([
      categoria.findById('60b77e0a4539b11caa5df071').populate('produtos'),
      fornecedor.findById('60be0415648d6ea9d843ac7b').populate('produtos')
    ])

  } catch (error) {

    console.log(error);

    throw error;

  }

}


init();
