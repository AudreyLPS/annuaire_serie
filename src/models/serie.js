import {Schema,model} from 'mongoose';

const serieSchema = new Schema({
    titre: {
        type: String,
        required: true,
    },
    annee: {
        type: String,
        required: true,
    },
    
    synopsis:String,

    categorie:{
        type: String,
        default:true,
    },
    saison:[{
        titre: String,
        numero:String,
        episode:[{
                titre:String,
                numero:String,
                duree:String,
                userWatch:[]
        
        }]
    }]
});

const Serie= model('Serie',serieSchema);

export default Serie;