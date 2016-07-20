/**
 * Created by arobichaud on 7/20/2016.
 */
var Playground = require('../models/playground');

module.exports = {
    getApiRouter: function (express) {
        var router = express.Router();

        // Implement root node
        router.get('/', function(req, res) {
            res.json({ message: 'Hello again, world!'});
        });

        // Implement Middleware
        router.use(function(req, res, next) {
            // Perform security checks and validation.
            next();
        });

        // Implement API nodes
        router.route('/playgrounds')
            .post(function(req, res) {
                var playground = new Playground();
                console.log( req.body );
                playground.name = req.body.name;
                playground.description = req.body.description;
                playground.latitude = req.body.latitude;
                playground.longitude = req.body.longitude;
                playground.save(function(err){
                    if ( err ) res.send(err);
                    res.json({message: 'Playground \'' + playground.name + '\' created!'});
                });
            })
            .get(function(req, res) {
                Playground.find(function(err, playgrounds) {
                    if ( err ) res.send(err);
                    res.json(playgrounds);
                });
            });

        router.route('/playgrounds/:pg_id')
            .get(function(req, res) {

            })
            .put(function(req, res) {
                Playground.findById(req.params.pg_id, function (err, pg) {
                    if ( err ) res.send(err);
                    if ( req.body.name        ) pg.name = req.body.name;
                    if ( req.body.description ) pg.description = req.body.description;
                    if ( req.body.latitude    ) pg.latitude = req.body.latitude;
                    if ( req.body.longitude   ) pg.longitude = req.body.longitude;

                    pg.save(function(err){
                        if ( err ) res.send(err);
                        res.json({ message: 'Playground \'' + pg.name + '\' updated.'});
                    })
                })
            })
            .delete(function(req, res) {
                Playground.remove({
                    _id: req.params.pg_id
                }, function(err, pg) {
                    if ( err ) res.send(err);
                    res.json({message: 'Successfully deleted playground \'' + pg.name + '\''});
                });
            });



        return router;
    }
};