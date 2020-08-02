const mycon = require('../util/conn');
const jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

exports.getAllUsers = (req, res, next) => {
    try {
        mycon.execute("select * from user",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.newPost = (req, res, next) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd");
    try {
        mycon.execute("INSERT INTO `adv` ( `city_idcity`, `distric_iddistric`, `cat_idcat`, `deler`, `adv_start_date`, `adv_end_date`, `adv_status`, `adv_priority` ) " +
            " VALUES 	(  '" + req.body.city + "', '" + req.body.distric + "', '" + req.body.lastSelected + "', '" + req.body.user + "', '" + day + "', NULL, 0, NULL )",
            (error, rows, fildData) => {
                if (!error) {
                    let id = rows.insertId;
                    mycon.execute("INSERT INTO `details` (`company_name`,`owner_name`,`address1`,`address2`,`address3`,`description`, " +
                        " `company_name_sinhala`,`owner_name_sihala`,`description_sinhala`,`con_phone`,`con_mobile`,`con_imo`,`con_viber`, " +
                        "  `con_whatsapp`,`con_fb`,`con_web`,`con_youtube`,`details_other`,`adv_idadv`) " +
                        "  VALUES ('" + req.body.company + "','" + req.body.owner + "','" + req.body.adl1 + "','" + req.body.adl2 + "','" + req.body.adl3 + "', " +
                        "  '" + req.body.des + "','" + req.body.companyS + "','" + req.body.ownerS + "', " +
                        "  '" + req.body.desS + "','" + req.body.phone + "','" + req.body.mobile + "','" + req.body.imo + "',NULL,NULL,'" + req.body.fb + "','" + req.body.web + "','" + req.body.yt + "',NULL,'" + id + "')",
                        (er, ro, fd) => {
                            if (!er) {
                                res.send({ 'idAdv': id });
                            } else {
                                console.log(er);
                                res.status(500).send(error);
                            }
                        });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getPending = (req, res, next) => {
    try {
        mycon.execute("SELECT adv.idadv,adv.city_idcity,adv.distric_iddistric,adv.cat_idcat,adv.deler,adv.adv_start_date, " +
            "   adv.adv_end_date,adv.adv_status,adv.adv_priority,details.iddetails,details.company_name,details.owner_name," +
            "   details.address1,details.address2,details.address3,details.description,details.company_name_sinhala," +
            "   details.owner_name_sihala,details.description_sinhala,details.con_phone,details.con_mobile,details.con_imo," +
            "   details.con_viber,details.con_whatsapp,details.con_fb,details.con_web,details.con_youtube,details.details_other," +
            "   details.adv_idadv,image.idimage,image.image_path,image.image_status FROM adv " +
            "   INNER JOIN details ON details.adv_idadv=adv.idadv INNER JOIN image ON image.adv_idadv=adv.idadv " +
            "   WHERE adv.adv_status=0 GROUP BY adv.idadv", (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
