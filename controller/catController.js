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


exports.getAllSubCats = (req, res, next) => {
    this.round = 0;
    this.methods(0);
    setTimeout(function () {
        res.send({ cat: cats });
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

