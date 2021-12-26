require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');
const Citizen = require('../models/Citizen');
const sequelize = require('../../config/db/sequelize');
const { get } = require('express/lib/response');

function getYear(dob) {
    return dob.slice(0, 4);
}

function getAge(dob) {
    let now = new Date();
    return now.getFullYear() - dob.slice(0, 4);
}

function getAgeDepend(dob, year) {
    return year - dob.slice(0, 4);
}

class AnalystController {

    // [GET] /api/analyst/count
    async countAll(req, res, next) {
        if(!req.user.per_scope) {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false
                }
            });
            let count = 0, countEach = [];
            for(let i = 0; i < 4; ++i) countEach[i] = 0;
            for(let i of citizens) {
                let year = getYear(i.dataValues.dob);
                if(year <= 1990) ++countEach[0];
                if(year <= 2000) ++countEach[1];
                if(year <= 2010) ++countEach[2];
                if(year <= 2020) ++countEach[3];
            }
            for(let i = 0; i < 4; ++i) count += countEach[i];
            res.json({
                success: true,
                citizen: {
                    tong: countEach[3],
                    countEach
                }
            })
        }
        else {
            const citizens = await Citizen.findAll({
                where: {
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            });
            let count = 0, countEach = [];
            for(let i = 0; i < 4; ++i) countEach[i] = 0;
            for(let i of citizens) {
                let year = getYear(i.dataValues.dob);
                if(year <= 1990) ++countEach[0];
                if(year <= 2000) ++countEach[1];
                if(year <= 2010) ++countEach[2];
                if(year <= 2020) ++countEach[3];
            }
            for(let i = 0; i < 4; ++i) count += countEach[i];
            res.json({
                success: true,
                citizen: {
                    tong: countEach[3],
                    countEach
                }
            })
        }
    }
    
    // [GET] /api/analyst/gender
    async gender(req, res, next) {
        if(!req.user.per_scope) {
            const all = await Citizen.findAll({
                where: {
                    is_deleted: false,
                }
            });
            let nam = [], nu = [];
            for(let i = 0; i < 4; ++i) {
                nam[i] = 0;
                nu[i] = 0;
            }
            for(let i of all) {
                if(i.dataValues.gender == 'nữ' ) {
                    let year = getYear(i.dataValues.dob);
                    if(year <= 1990) ++nu[0];
                    if(year <= 2000) ++nu[1];
                    if(year <= 2010) ++nu[2];
                    if(year <= 2020) ++nu[3];
                }
                else if(i.dataValues.gender == 'nam') {
                    let year = getYear(i.dataValues.dob);
                    if(year <= 1990) ++nam[0]
                    if(year <= 2000) ++nam[1];
                    if(year <= 2010) ++nam[2];
                    if(year <= 2020) ++nam[3];
                }
            }
            let countNam = 0, countNu = 0;
            for(let i = 0; i < 4; ++i) {
                countNam += nam[i];
                countNu += nu[i];
            }
            res.json({
                success: true,
                gender: {
                    tong: {
                        countNam: nam[3],
                        countNu: nu[3]
                    },
                    nam,
                    nu
                }
            })
        }
        else {
            const all = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }
            });
            let nam = [], nu = [];
            for(let i = 0; i < 4; ++i) {
                nam[i] = 0;
                nu[i] = 0;
            }
            for(let i of all) {
                if(i.dataValues.gender == 'nữ' ) {
                    let year = getYear(i.dataValues.dob);
                    if(year <= 1990) ++nu[0];
                    if(year <= 2000) ++nu[1];
                    if(year <= 2010) ++nu[2];
                    if(year <= 2020) ++nu[3];
                }
                else if(i.dataValues.gender == 'nam') {
                    let year = getYear(i.dataValues.dob);
                    if(year <= 1990) ++nam[0]
                    if(year <= 2000) ++nam[1];
                    if(year <= 2010) ++nam[2];
                    if(year <= 2020) ++nam[3];
                }
            }
            let countNam = 0, countNu = 0;
            for(let i = 0; i < 4; ++i) {
                countNam += nam[i];
                countNu += nu[i];
            }
            res.json({
                success: true,
                gender: {
                    tong: {
                        countNam: nam[3],
                        countNu: nu[3]
                    },
                    nam,
                    nu
                }
            })
        }
    }

    // [GET] /api/analist/age
    async age(req, res, next) {
        if(!req.user.per_scope) {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false
                }
            });
            let khong = [], phothong = [], daihoc = [];
            for(let i = 0; i < 4; ++i) {
                khong[i] = 0;
                phothong[i] = 0;
                daihoc[i] = 0;
            }
            // let now = new Date();
            for(let i of citizens) {
                
                if(age >= 0 && age <= 14) ++kid[0];
                if(age >= 14 && age <= 64) ++adult[0];
                if(age >= 65) ++elder[0];

                age = getAgeDepend(i.dataValues.dob, 2000);
                if(age >= 0 && age <= 14) ++kid[1];
                if(age >= 14 && age <= 64) ++adult[1];
                if(age >= 65) ++elder[1];

                age = getAgeDepend(i.dataValues.dob, 2010);
                if(age >= 0 && age <= 14) ++kid[2];
                if(age >= 14 && age <= 64) ++adult[2];
                if(age >= 65) ++elder[2];

                age = getAgeDepend(i.dataValues.dob, 2020);
                if(age >= 0 && age <= 14) ++kid[3];
                if(age >= 14 &&  age <= 64) ++adult[3];
                if(age >= 65) ++elder[3];
            }
            let countKid = 0, countAdult = 0, countElder = 0;
            for(let i of citizens) {
                let age = getAge(i.dataValues.dob);
                if(age <= 14) ++countKid;
                else if(age <= 64) ++countAdult;
                else ++countElder;
            }
            res.json({
                success: true,
                age: {
                    tong: {
                        countKid,
                        countAdult,
                        countElder
                    },
                    kid,
                    adult, 
                    elder
                }
            })
        }
        else {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }
            });
            let kid = [], adult = [], elder = [];
            for(let i = 0; i < 4; ++i) {
                kid[i] = 0;
                adult[i] = 0;
                elder[i] = 0;
            }
            // let now = new Date();
            for(let i of citizens) {
                let age = getAgeDepend(i.dataValues.dob, 1990);
                if(age >= 0 && age <= 14) ++kid[0];
                if(age >= 14 && age <= 64) ++adult[0];
                if(age >= 65) ++elder[0];

                age = getAgeDepend(i.dataValues.dob, 2000);
                if(age >= 0 && age <= 14) ++kid[1];
                if(age >= 14 && age <= 64) ++adult[1];
                if(age >= 65) ++elder[1];

                age = getAgeDepend(i.dataValues.dob, 2010);
                if(age >= 0 && age <= 14) ++kid[2];
                if(age >= 14 && age <= 64) ++adult[2];
                if(age >= 65) ++elder[2];

                age = getAgeDepend(i.dataValues.dob, 2020);
                if(age >= 0 && age <= 14) ++kid[3];
                if(age >= 14 &&  age <= 64) ++adult[3];
                if(age >= 65) ++elder[3];
            }
            let countKid = 0, countAdult = 0, countElder = 0;
            for(let i of citizens) {
                let age = getAge(i.dataValues.dob);
                if(age <= 14) ++countKid;
                else if(age <= 64) ++countAdult;
                else ++countElder;
            }
            res.json({
                success: true,
                age: {
                    tong: {
                        countKid,
                        countAdult,
                        countElder
                    },
                    kid,
                    adult, 
                    elder
                }
            }) 
        }
    }

    // [GET] /api/analist/academic-level
    async academicLevel(req, res, next) {
        if(!req.user.per_scope) {
            const academic = await Citizen.findAll({
                where: {
                    is_deleted: false
                }    
            });
            let khong = 0, phothong = 0, daihoc = 0;
            for(let i of academic) {
                if(i.dataValues.academic_level.to == 'Không') ++khong;
                else if(i.dataValues.academic_level == 'Phổ thông') ++phothong;
                else if(i.dataValues.academic_level == 'Đại học') ++daihoc;
            }
            res.json({
                success: true,
                academic : {
                    khong,
                    phothong,
                    daihoc
                }
            })
        }
        else {
            const academic = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }    
            });
            let khong = 0, phothong = 0, daihoc = 0;
            for(let i of academic) {
                if(i.dataValues.academic_level.to == 'Không') ++khong;
                else if(i.dataValues.academic_level == 'Phổ thông') ++phothong;
                else if(i.dataValues.academic_level == 'Đại học') ++daihoc;
            }
            res.json({
                success: true,
                academic : {
                    khong,
                    phothong,
                    daihoc
                }
            })
        }
    }

}

module.exports = new AnalystController;