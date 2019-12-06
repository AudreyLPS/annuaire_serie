import Serie from "../models/Serie";

class SerieController{

    //Liste serie => elle foncitonne    
    static async list(request,response){
       
        let status=200;
        let body={};

        try {
            let series = await Serie.find();
            body={series, 'message':'Liste serie'};

        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);

    }
    // liste toutes les saisons d'une serie  => Ca focntionne
    static async listSaison(request,response){
       
        let status=200;
        let body={};

        try {
            let id = request.params.id_serie;
            let serie = await Serie.findById(id);
            let saisons= serie.saison;

            body={saisons, 'message':'Liste saison'};

        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);

    }
    
    // liste toutes les episodes d'une saison => Ca focntionne
    static async listEpisode(request,response){
       
    let status=200;
    let body={};

    try {
        let id_saison = request.params.id_saison;
        let id_serie = request.params.id_serie;
        let episodes=[];
        let serie = await Serie.findById(id_serie);
        let saisons= serie.saison;
        saisons.map(item=>{
            if(item.id===id_saison){
                episodes=item.episode;
                
                body={episodes, 'message':'Liste episode'};
            }
        })

    } catch (error) {
        status=500;
        body={'message':error.message};
    }
    return response.status(status).json(body);

}
    // creation serie => elle foncitonne
    static async create(request,response){
        let status=200;
        let body={};

        try {
            let serie=await Serie.create({
                
                titre:request.body.titre,
                annee:request.body.annee,
                synopsis:request.body.synopsis,
                categorie:request.body.categorie,
                saison: request.body.saison


            });
            body={serie,'message':'Serie créée'}
        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);
    }
    
    //creation saison => elle foncitonne
    static async addSaison(request, response) {
        let status = 200;
        let body = {};

        try {
            let id = request.params.id;
            let serie = await Serie.findById(id);
            let saisons = serie.saison;
            let saison = {
                titre: request.body.titre,
                numero: request.body.numero,
                episode: request.body.episode,
                serie_id: id,
                
            };
            saisons.push(saison);
            serie.saison=saisons;
            serie.save();

            body = { serie, 'message': ' Saison créée' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);

    }


    //creation d'episode => elle foncitonne
    static async addEpisode(request, response) {
        let status = 200;
        let body = {};

        try {
            let id_serie = request.params.id_serie;
            let id_saison = request.params.id_saison;


            let serie = await Serie.findById(id_serie);
            let saisons = await serie.saison;
            let episode=[];
            saisons.map(item=>{
                if(item.id===id_saison){
                    episode={ 
                        titre: request.body.titre,
                        duree: request.body.duree,
                        numero:request.body.numero,
                        userWatch: request.body.userWatch,
                        saison_id: id_saison,
        
                    };
                    item.episode.push(episode);
                }
            })
            
            serie.saisons = saisons;
            serie.save();

            body = { episode, 'message': ' Episode créée' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);

    }

    //details serie 
    static async details ( request,response){
        let status=200;
        let body={};
        try {
            let id=request.params.id;
            let serie= await Serie.findById(id);
            body={serie,'message': 'une serie'}

        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);
    }

    
        //details serie 
        static async detailsSaison ( request,response){
            let status=200;
            let body={};
            try {
                let id_serie=request.params.id_serie;
                let id_saison=request.params.id_saison;
                let serie= await Serie.findById(id_serie);
                let saisons = serie.saison;
                let saison=[];
                saisons.map(item=>{
                    if(item.id===id_saison){
                        saison=item;
                        };
                    })
                body={saison,'message': 'une saison'}
    
            } catch (error) {
                status=500;
                body={'message':error.message};
            }
            return response.status(status).json(body);
        }

    // delete serie
    static async delete ( request, response){
        let status=200; 
        let body={};
        try{
            let id= request.params.id; 
            await Serie.deleteOne({_id: id});
            body={'message':'Serie Supprimé'};

        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }

    // delete saison 
    static async deleteSaison ( request, response){
    let status=200; 
    let body={};
    try{
        let id_serie= request.params.id_serie; 
        let id_saison=request.params.id_saison;

        let serie = await Serie.findById(id_serie);
        let saisons =serie.saison;

        saisons.map((item, index) => {
            if (item.id === id_saison) {
                saisons.splice(index, 1);
            }
        })
        
        serie.saison=saisons;
        serie.save();

        body = {'message': ' saison supprimer' };

    }
    catch(error){
        status=500;
        body={'message': error.message}
    }
    return response.status(status).json(body);
}

    // delete episode 
    static async deleteEpisode ( request, response){
    let status=200; 
    let body={};
    try{
        let id_serie= request.params.id_serie; 
        let id_saison=request.params.id_saison;
        let id_episode=request.params.id_episode;

        let serie = await Serie.findById(id_serie);
        let saisons =  serie.saison;

        let saison = saisons.find(item => item.id == id_saison);
        let saisonIndex = saisons.findIndex(item => item.id == id_saison);
        let episode = saison.episode.find(item => item.id == id_episode);
        let episodeIndex = saison.episode.findIndex(item => item.id == id_episode);
        saison.episode.splice(episodeIndex, 1);

        saisons[saisonIndex] = saison;
        serie.saisons = saisons;
        await serie.save();
        
        body = {serie, 'message': ' episode supprimé' };

    }
    catch(error){
        status=500;
        body={'message': error.message}
    }
    return response.status(status).json(body);
}
    
    // update serie 
    static async update ( request, response){
        let status=200; 
        let body={};
        try{
            let id= request.params.id; 
            let serie = await Serie.findById(id);
            await serie.update(request.body);
            body={serie, 'message':'une serie modifiée'};

        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }

    
    
}

export default SerieController;