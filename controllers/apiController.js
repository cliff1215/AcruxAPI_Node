//const Sequelize = require('sequelize');
var fs = require('fs');
const dbSession = require('../models/dbsession');
const Patient = dbSession.Patient;
const Exam = dbSession.Exam;
const Image = dbSession.Image;

exports.rootGet = (req, res) => {
    res.send({ 
        message: 'Now, acrux PACS system api is serving...',
        example1: '/api/patient',
        example2: '/api/patient/:patient_id',
        example3: '/api/exam' 
    });
};

exports.patGetAll = (req, res) => {
    Patient.findAll().then(patients => {
        res.json(patients);
    }).catch(error => {
        res.send(error);
    });
};

exports.patGetAllIncExam = (req, res) => {
    Patient.findAll({
        include: [{
            model: Exam
            // model: Exam,
            // where: {patient_id: Sequelize.col('patient.id')}
        }]
    }).then(patients => {
        res.json(patients);
    }).catch(error => {
        res.send(error);
    });
};

exports.patGetById = (req, res) => {
    Patient.findById(req.params.pat_id).then(patient => {
        res.json(patient);
    }).catch(error => {
        res.send(error);
    });
};

exports.examGetAll = (req, res) => {
    Exam.findAll().then(exams => {
        res.json(exams);
    }).catch(error => {
        res.send(error);
    });
};

exports.examGetAllIncPat = (req, res) => {
    Exam.findAll({
        include: [{
            model: Patient
            // model: Patient,
            // where: {id: Sequelize.col('exam.patient_id')}
        }] //,attributes: ['id', 'studyDate', 'modality', 'description', 'bodypart', 'imageCount']
        , where: { studyDate: {$lt: new Date('2014-01-01T00:00:00.000Z')}}
    }).then(exams => {
        res.json(exams);
    }).catch(error => {
        res.send(error);
    });
};

exports.imgGetAll = (req, res) => {
    Image.findAll().then(images => {
        res.json(images);
    }).catch(error => {
        res.send(error);
    });
};

exports.imgGetById = (req, res) => {
    Image.findById(req.params.image_id).then(image => {
        res.json(image);
    }).catch(error => {
        res.send(error);
    });
};

exports.imgGetAllByExamId = (req, res) => {
    Image.findAll({
        where: { exam_id: req.params.exam_id }
    }).then(images => {
        res.json(images);
    }).catch(error => {
        res.send(error);
    });
};

exports.imgGetFileById = (req, res) => {
    Image.findById(req.params.image_id).then(image => {
        //res.json(image);
        console.log(image.path);
        fs.readFile(image.path, 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                return res.send(error);
            }
            res.send(JSON.parse(data));
            //res.send(data);
        });

    }).catch(error => {
        res.send(error);
    });    
}

// module.exports = {
//     rootGet: rootGet,
//     patGetAll: patGetAll,
//     patGetById: patGetById
// };


// var loadFile = (filelname) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filelname, 'utf8', (err, data) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(JSON.parse(data));
//         });
//     });
// };

// Sync:
// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('file', 'utf8'));

// Async:
// var fs = require('fs');
// var obj;
// fs.readFile('file', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
// });