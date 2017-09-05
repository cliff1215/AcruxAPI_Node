var express = require('express');
const apiCtrl = require('../controllers/apiController');

var apiRouter = express.Router();
apiRouter.route('')
    .get(apiCtrl.rootGet);

apiRouter.route('/patient')
    .get(apiCtrl.patGetAllIncExam);
    //.get(apiCtrl.patGetAll); //patGetAllIncExam
apiRouter.route('/patient/:pat_id')
    .get(apiCtrl.patGetById);

apiRouter.route('/exam')
    .get(apiCtrl.examGetAllIncPat);

apiRouter.route('/image')
    .get(apiCtrl.imgGetAll);
apiRouter.route('/image/:image_id')
    .get(apiCtrl.imgGetById);
apiRouter.route('/image/exam/:exam_id')
    .get(apiCtrl.imgGetAllByExamId);
apiRouter.route('/image/file/:image_id')
    .get(apiCtrl.imgGetFileById);    

module.exports = apiRouter;