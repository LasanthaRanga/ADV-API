const mycon = require('../util/conn');

var dateFormat = require('dateformat');



exports.getAll = (req, res, next) => {
    try {
        let ar = [];
        mycon.execute("SELECT cat.id,cat.parent_id,cat.`name`,cat.`status`,cat.step FROM cat ORDER BY cat.step ASC",
            (error, rows, fildData) => {
                len = rows.length;
                for (i = 0; i < len; i++) {
                    e = rows[i];
                    obj = {
                        id: e.id,
                        parent_id: e.parent_id,
                        name: e.name,
                        status: e.status,
                        step: e.step,
                        child: []
                    }
                    if (obj.parent_id == 0) {
                        ar.push(obj); // Step 00
                    } else {
                        ar.forEach(a => {
                            if (obj.parent_id == a.id) {
                                a.child.push(obj);
                            }
                            a.child.forEach(aa => {
                                if (obj.parent_id == aa.id) {
                                    aa.child.push(obj);
                                }
                                aa.child.forEach(aaa => {
                                    if (obj.parent_id == aaa.id) {
                                        aaa.child.push(obj);
                                    }
                                    aaa.child.forEach(aaaa => {
                                        if (obj.parent_id == aaaa.id) {
                                            aaaa.child.push(obj);
                                        }
                                        aaaa.child.forEach(aaaaa => {
                                            if (obj.parent_id == aaaaa.id) {
                                                aaaaa.child.push(obj);
                                            }
                                            aaaaa.child.forEach(aaaaaa => {
                                                if (obj.parent_id == aaaaaa.id) {
                                                    aaaaaa.child.push(obj);
                                                }
                                            }); // Step 06
                                        }); // Step 05
                                    }); // Step 04
                                }); // Step 03
                            }); // Step 02
                        }); // Step 01
                    }  // Step 00              
                };
                res.send(ar);
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addCat = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `cat`( `parent_id`, `name`, `status`, `step`, `sinhala`) VALUES ( '" + req.body.parent_id + "', '" + req.body.ename + "','1', '" + req.body.step + "',  '" + req.body.sname + "')", (error, rows, fildData) => {
            if (!error) {
                console.log(rows);
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

var cats = [];
var round = 0;
var stepsyes = 0;
var stepsNo = 0;

var adds;

exports.getAllSubCats = (req, res, next) => {
    cats = [];
    this.round = 0;
    this.methods(req.body.id);
  
    setTimeout(function () {
        let catsids = " ";    
        var len = cats.length;
        for (var i = 0; i < len; i++) {
            if (i == len - 1) {
                catsids += cats[i].id
            } else {
                catsids += cats[i].id + ','
            }
        }
        console.log(catsids);
        res.send({ ids: catsids });

    }, 100);
}

exports.methods = (id) => {
    
    try {
        mycon.execute("SELECT cat.id,cat.parent_id,cat.`name`,cat.`status`,cat.step,cat.sinhala FROM cat WHERE cat.parent_id= " + id, (error, rows, fildData) => {
            if (!error) {
                rows.forEach(e => {
                    cats.push(e);
                    this.methods(e.id);
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAddsByCats = (req, res, next) => {
    try {
        mycon.execute(
            "SELECT adv.idadv,adv.city_idcity,adv.distric_iddistric,adv.cat_idcat,adv.deler,adv.adv_start_date,adv.adv_end_date,adv.adv_status,adv.adv_priority,details.iddetails,details.company_name,details.owner_name,details.address1,details.address2,details.address3,details.description,details.company_name_sinhala,details.owner_name_sihala,details.description_sinhala,details.con_phone,details.con_mobile,details.con_imo,details.con_viber,details.con_whatsapp,details.con_fb,details.con_web,details.con_youtube,details.details_other,details.adv_idadv,image.idimage,image.image_path,image.image_status,cat.id,cat.`name` FROM adv INNER JOIN details ON details.adv_idadv=adv.idadv INNER JOIN image ON image.adv_idadv=adv.idadv INNER JOIN cat ON cat.id=adv.cat_idcat WHERE adv.adv_status=1 AND adv.cat_idcat  " +
            " IN (" + req.body.list + ") " +
            " GROUP BY adv.idadv ORDER BY adv.adv_priority ASC",
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

