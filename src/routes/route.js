import {Router} from 'express';
import SerieController from '../controllers/series.controller';
import UserController from '../controllers/users.controller';

const router = Router();

router.get('/hello', (reg,res)=>{
    console.log('Hello');
    res.send('Hello');
});

//Series
router.get('/series', SerieController.list);
router.post('/series',SerieController.create);
router.get('/series/:id', SerieController.details);
router.delete('/series/:id', SerieController.delete);
router.put('/series/:id', SerieController.update);

//saison
router.get('/saisons/:id_serie', SerieController.listSaison);
router.post('/series/:id',SerieController.addSaison);

router.get('/saison/:id_serie/:id_saison', SerieController.detailsSaison);
router.delete('/saisons/:id_serie/:id_saison', SerieController.deleteSaison);

//episode
router.get('/episodes/:id_serie/:id_saison', SerieController.listEpisode);
router.post('/serie/:id_serie/saison/:id_saison',SerieController.addEpisode);
router.delete('/episodes/:id_serie/:id_saison/:id_episode', SerieController.deleteEpisode);

//Users
router.get('/users', UserController.list);
router.post('/users',UserController.create);
router.get('/users/:id', UserController.details);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);
router.get('/userfavoris/:id_user',UserController.userfavoris);
router.delete('/supfavoris/:id_user/:id_serie',UserController.supfavoris);
router.post('/addfavoris/:id_user',UserController.addfavoris);

//authentification
router.post('/auth', UserController.authentification);
export default router;
