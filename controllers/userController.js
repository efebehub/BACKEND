import connDB from "../database/db.js"
import bjs from 'bcrypt'

export const consultarUser = async (req, res) => {

    console.log(req.params)

    try {

        let xuserid = ''
        let xsql = ''

        if (req.params.pid) {
            xuserid = req.params.pid;
            xsql = 'select id, user, name, pass, idrol  from g_usuarios where id= ? '
        } else {
            xsql = `select id, user, name, pass, g_usuarios.idrol, g_roles.descripcion as rol  
                      from g_usuarios left outer join g_roles on g_usuarios.idrol=g_roles.idrol 
                      order by user `
        } 

        console.log('USERID '+xuserid)


        connDB.query(xsql, [xuserid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 0,
                    message: xerror,
                  });

            } else {

                res.status(200);
                res.json({ results });

            }
        });

    } catch (error) {
        console.log(error);
    }

}

export const guardarUser = async (req,res) => {

    console.log('guardarUser:'+req.body.accion)

    try {
        const xaccion = req.body.accion;
        const xid = req.body.id;
        const xuser = req.body.user;  
        let xname = req.body.name; xname =  xname[0].toUpperCase() + xname.slice(1).toLowerCase();
        const xpass = req.body.pass;
        const xidrol = req.body.idrol;

        console.log(xname)

        let xsql = ''
        if (xaccion=='A') {
            xsql = 'insert into g_usuarios (user, name, pass, idrol) values (?, ?, ?, ?) '
            connDB.query(xsql, [xuser,xname,xpass,xidrol], async (xerror,results)=>{
                if (xerror) {
                    console.log(xerror);
    
                    return res.status(500).json({
                        error: 0,
                        message: xerror,
                      });
    
                } else {
    
                    res.status(200);
                    res.json({ results });
    
                }
            });

        } else {
            xsql = 'update g_usuarios set user=?, name=?, idrol=? where id= ? '
            connDB.query(xsql, [xuser,xname,xidrol,xid], async (xerror,results)=>{
                if (xerror) {
                    console.log(xerror);
    
                    return res.status(500).json({
                        error: 0,
                        message: xerror,
                      });
    
                } else {
    
                    res.status(200);
                    res.json({ results });
    
                }
            });

            if (xpass) {

                let xpass2 = await bjs.hash(xpass, 8);        

                xsql = 'update g_usuarios set pass=? where id= ? '
                connDB.query(xsql, [xpass2,xid], async (xerror,results)=>{
                    if (xerror) {
                        console.log(xerror);
        
                        return res.status(500).json({
                            error: 0,
                            message: xerror,
                          });
        
                    } else {
        
                        return res.status(200).json({
                            error: '',
                            message: '',
                          });
        
                    }
                });
            }

        }



    } catch (error) {
        console.log(error);
    }

}

export const borrarUser = async (req,res) => {

    console.log(req.params)

    try {
        const xuserid = req.params.pid;

        let xsql = ''
        if (xuserid=='') {
            return res.status(404).json({
                error: 0,
                message: xerror,
              });
        } 
            
        
        xsql = 'delete from g_usuarios where id= ? '
        connDB.query(xsql, [xuserid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 0,
                    message: xerror,
                  });

            } else {

                res.status(200);
                res.json({ results });

            }
        });

    } catch (error) {
        console.log(error);
    }
}