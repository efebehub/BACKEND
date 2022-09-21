import connDB from "../database/db.js"

export const consultarRol = async (req, res) => {

    //console.log(req.params)

    try {

        let xRolid = ''
        let xsql = ''

        if (req.params.pid) {
            xRolid = req.params.pid;
            xsql = 'select idrol, descripcion from g_roles where idrol= ? '
        } else {
            xsql = 'select idrol, descripcion from g_roles order by descripcion '
        } 

        //console.log('RolID '+xRolid)
//

        connDB.query(xsql, [xRolid], async (xerror,results)=>{
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

export const guardarRol = async (req,res) => {

    //console.log('guardarRol:'+JSON.stringify(req.body))

    try {
        const xaccion = req.body.accion;
        const xid = req.body.idrol;
        let xdesc = req.body.desc;  xdesc =  xdesc[0].toUpperCase() + xdesc.slice(1).toLowerCase();


        let xsql = ''
        if (xaccion=='A') {
            xsql = 'insert into g_roles (descripcion) values (?) '
            connDB.query(xsql, [xdesc], async (xerror,results)=>{
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
            xsql = 'update g_roles set descripcion=? where idrol= ? '
            connDB.query(xsql, [xdesc,xid], async (xerror,results)=>{
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
        }


        //Borrar todos los permisos y cargarlos segun el parametro
        if (xid!='') {
            xsql = 'delete from g_menu_roles where idrol= ? '
            connDB.query(xsql, [xid], async (xerror,results)=>{
                if (xerror) {
                    console.log(xerror);

                    return res.status(500).json({
                        error: 0,
                        message: xerror,
                    });

                } 
            });
        }


        
        if (req.body.accesos) {

            

            let arr = req.body.accesos.check

            

            var arrAccesos = arr.split(',');

            //console.log('ACCESOS'+JSON.stringify(arrAccesos))
            
            for (let i = 0; i<arrAccesos.length; i++){

                //console.log('ACCESOS'+arr[i])

                xsql = 'insert into g_menu_roles (idrol,idmenu,acceso) values (?,?,2) '
                connDB.query(xsql, [xid,arrAccesos[i]], async (xerror,results)=>{
                    if (xerror) {
                        console.log('ERROR'+xerror);
    
                        return res.status(500).json({
                            error: 0,
                            message: xerror,
                        });
    
                    } 
                });
            }

        }


    } catch (error) {
        console.log(error);
    }

}

export const borrarRol = async (req,res) => {

    //console.log(req.params)

    try {
        const xRolid = req.params.pid;

        let xsql = ''
        if (xRolid=='') {
            return res.status(404).json({
                error: 0,
                message: xerror,
              });
        } 
            
        
        xsql = 'delete from g_roles where idrol= ? '
        connDB.query(xsql, [xRolid], async (xerror,results)=>{
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