const fileUtils = require('../file.utils');
const form = formidable.IcomingForm();

const fileUpdates = (destino) => {
    return (req, res, next) => {

        form.parse(req, (err, filds, files )=>{
            if(!files.imagem){
                return res.status(400).send({
                    mensagem: 'Não foi possivel realizar a operação',
                    detalhes: [
                        '"imagem" é de preenchimento obrigatório!'
                    ]
                });
            }
            return next();
        });
    }
}