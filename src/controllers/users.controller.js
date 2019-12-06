import User from "../models/user";

class UserController{

    // liste des utilisateurs
    static async list(request,response){
       
        let status=200;
        let body={};

        try {
            let users = await User.find();
            body={users, 'message':'Liste utilisateur'};

        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);

    }

    // retourne la liste des favoris d'un utilisateur
    static async userfavoris(request,response){
       
        let status=200;
        let body={};

        try {
            let id_user=request.params.id_user;
            let user= await User.findById(id_user);
            let favoris = user.favoris;
    
                body={favoris, 'message':'Liste des favoris'};
    
            } catch (error) {
                status=500;
                body={'message':error.message};
            }
            return response.status(status).json(body);
    }

    //ajoute un id dans le tableau des favoris 
    static async addfavoris(request,response){
        let status = 200;
        let body = {};

        try {
            let favoris =[];
            let id_user = request.params.id_user;
            let user = await User.findById(id_user);
            favoris={ 
                id_serie: request.body.id_serie,
            };
            user.favoris.push(favoris);
            user.save();
            body = { user, 'message': ' favorie ajouter' };
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }

    //supprime un favoris 
    static async supfavoris(request,response){
        let status=200; 
        let body={};
        try{
            let id_user= request.params.id_user; 
            let id_serie=request.params.id_serie;
    
            let user = await User.findById(id_user);
            let favoris =user.favoris;
    
            favoris.map((item, index) => {
                if (item.id_serie === id_serie) {
                    favoris.splice(index, 1);
                }
            })
            
            user.favoris=favoris;
            user.save();
    
            body = {'message': ' favoris supprimer' };
    
        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }

    // permet de créer un utilisateur 
    static async create(request,response){
        let status=200;
        let body={};

        try {
            let user=await User.create({
                pseudo:request.body.pseudo,
                role: request.body.role,
                email:request.body.email,
                ddn:request.body.ddn,
                mdp:request.body.mdp,
                favoris:request.body.favoris

            });
            body={user,'message':'User plus okay'}
        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);
    }
  
    //retourne les détails d'un utilisateur 
    static async details ( request,response){
        let status=200;
        let body={};
        try {
            let id=request.params.id;
            let user= await User.findById(id);
            body={user,'message': 'un user'}

        } catch (error) {
            status=500;
            body={'message':error.message};
        }
        return response.status(status).json(body);
    }

 
    // permet de supprimer un utilisateur
    static async delete ( request, response){
        let status=200; 
        let body={};
        try{
            let id= request.params.id; 
            await User.deleteOne({_id: id});
            body={'message':'User Supprimé'};

        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }

    
    // permet de mettre a jour un utilisateur
    static async update ( request, response){
        let status=200; 
        let body={};
        try{
            let id= request.params.id; 
            let user = await User.findById(id);
            await user.update(request.body);
            body={user, 'message':'un user'};

        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }

    //permet de vérifier le couple id/mpd
    static async authentification(request, response){
        let status=200; 
        let body={};
        try{
            let user = await User.findOne({email: request.body.email});
            let mdp= request.body.mdp; 
            if( mdp===user.mdp){
                body={user, 'message':'user connecté'};
            }
        }
        catch(error){
            status=500;
            body={'message': error.message}
        }
        return response.status(status).json(body);
    }
}

export default UserController;