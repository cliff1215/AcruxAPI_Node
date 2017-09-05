const env = require('../env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.db_name, env.db_user, env.db_passwd, {
                    host: env.db_host,
                    dialect: env.db_diarect //, logging: false
});

var Patient = null;
var Exam = null;
var Series = null;
var Image = null;

var close = () => {
    sequelize.close();
}

var init = () => {
    console.log(">>> database initialized...");

    if (!sequelize) {
        return false;
    }
    Patient = sequelize.import('patient');
    Exam = sequelize.import('exam');
    Series = sequelize.import('series');
    Image = sequelize.import('image');

    Patient.hasMany(Exam);
    Exam.belongsTo(Patient);

    return true;
}

init();

module.exports = {
    //init: init,
    //close: close,
    Patient: Patient,
    Exam: Exam,
    Series: Series,
    Image: Image
};