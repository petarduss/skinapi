import axios from 'axios'; // Moduł axios do wykonywania żądań HTTP
import FormData from 'form-data'; // Moduł form-data do obsługi danych formularza
import fs from 'fs'; // Moduł fs do operacji na plikach

export default class Generate {
    public req;
    public res;
    public mongo;

    constructor(req, res, mongo) {
        this.req = req;
        this.res = res;
        this.mongo = mongo;
        this.uploadToMineskin();
    }

    /**
     * Metoda do przesyłania pliku do Mineskin API
     */
    async uploadToMineskin() {
        const file = this.req.file;

        if (!file) {
            console.log('Nie wybrano pliku');
            this.res.redirect('/');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(file.path), {
                filename: file.originalname,
                contentType: file.mimetype,
            });

            const response = await axios.post(
                'https://api.mineskin.org/generate/upload',
                formData,
                {
                    headers: formData.getHeaders(),
                }
            );

            const SkinSchema = require('./models/SkinSchema');
            const SkinSearch = await SkinSchema.findOne({ skinId: `${response.data.id}` });
            if (!SkinSearch) {
                await new SkinSchema({
                    skinId: response.data.id,
                    skinName: response.data.name,
                    skinUuid: response.data.data.uuid,
                    skinSignature: response.data.data.texture.signature,
                    skinValue: response.data.data.texture.value,
                    skinGeneratedLong: response.data.timestamp,
                }).save();
            }
            this.res.redirect(`/:${response.data.id}`);
        } catch (error) {
            console.error('Błąd podczas wywoływania:', error);
            this.res.redirect('/');
        }

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error('Błąd podczas usuwania pliku:', err);
                this.res.redirect('/');
            }
        });
    }
}
