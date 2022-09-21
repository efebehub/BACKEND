import jwt from 'jsonwebtoken'
import bjs from 'bcrypt'
import connDB from "../database/db.js"

//const {promisify} = require('util');

//login
export const login = async (req, res) => {

    console.log(req.body)

    try {
        const xuser = req.body.username;
        const xpass = req.body.password;

        
                //para generar el hash
                /*
                var salt = 'soloio';
                let xpass2 = await bjs.hash(xpass, 8);        
                console.log(xuser+'-'+xpass2);
                */

        

        if (xuser=='' || xpass=='') {
            //res.send({ status: 'usuario y clave obligatorios' });
            //return res.render('/index',{e:1});
            //return res.render('../views/index',{e:1});

            res.status(500);
            return res.json({
                message: 'Usuario o clave incorrecto (vacio)',
                error: ''
            });

        }

        
        connDB.query('select id, user, name, pass, idrol from g_usuarios where user= ? ', [xuser], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);
                return res.status(500).json({
                    error: 0,
                    message: xerror,
                });
            } else {



                //Validaciones de usuario y clave
                if (results.length==0 || ! (await(bjs.compare(xpass,results[0].pass)))) {

                    return res.status(500).json({
                        error: 0,
                        message: 'Usuario o clave incorrecto',
                    });

                }

                //TOKEN
                //console.log('LOG'+process.env.JWT_SECRET)

                const xid = results[0].id;
                const xus = results[0].user;
                const xname = results[0].name;
                const xidrol = results[0].idrol;
                //const xtoken = jwt.sign({id:xid}, process.env.JWT_SECRET, { expiresIn:process.env.JWT_TIMEOUT});
                const xtoken = jwt.sign({id:xid}, 'gldksjlgk', { expiresIn:'7d'});
                //COOKIES
                //const xcookieOptions = { expires: new Date(Date.now()+process.env.JWT_COOKIE * 24 * 60 * 60 * 1000), httpOnly: true}
                
                //res.cookie('jwt',xtoken, xcookieOptions);

                //return res.render('../views/main',{user:xus});
                //message: {user:xus, userid:xid },

                //console.log(xid)
                
 
                connDB.query('update g_usuarios set token=? where id= ? ', [xtoken,xid], async (xerror,results)=>{
                    if (xerror) {
                        console.log(xerror);

                        return res.status(500).json({
                            error: 0,
                            message: xerror,
                        });

                    } else {

                        //console.log('LOGIN '+xtoken+' '+xid)

                        return res.status(200).json({
                            error: '',
                            message: { name:xname, user:xus, userid:xid, idrol:xidrol },
                        });
                    }
                });
                    
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const isAuth = async(req,res)=> {

    //console.log('isAuth'+JSON.stringify(req.body))

    try {
        const xtoken = req.body.xtoken;

        connDB.query('select id, user, name, idrol from g_usuarios where token= ? ', [xtoken], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);
                res.status(500);
                res.json({
                    message: xerror,
                    error: ''
                });
            } else {

                if (results.length>0) {
                    const xid = results[0].id;
                    const xus = results[0].user;
                    const xidrol = results[0].idrol;
    
                    res.status(100);
                    res.json({
                        message: { user:xus, userid:xid, idrol:xidrol },
                        error: ''
                    });

                } else {

                    console.log(xtoken)

                    return res.status(500).json({
                        error: 0,
                        message: xerror,
                    });
                }


            }
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = (req,res)=> {

    console.log('LOGOUT '+JSON.stringify(req.body))

    try {
        const xid = req.body.pid;

        //console.log('LOGOUT '+xid)

        connDB.query('update g_usuarios set token=null where id= ? ', [xid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 0,
                    message: xerror,
                });

            } else {

                //borrar cookie
                res.clearCookie('jwt');
                res.status(200);
                res.json({
                    message: 'logout',
                    token: '',
                    error: ''
                });

            }
        });




    } catch (error) {
        console.log(error);
    }

}