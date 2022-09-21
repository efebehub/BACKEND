import connDB from "../database/db.js"

//login
export const consultarMenu = async (req, res) => {

    console.log(req.params)

    try {
        let xmenuid = ''
        if (req.params.pid) {  xmenuid = req.params.pid }
        let xsql = ''

        if (xmenuid=='') {
            
            xsql = `select g_menu.idmenu, g_menu.modulo, g_menu.opcion, g_menu.form, g_menu.orden
                         , g_menu_modulos.descripcion as descmodulo 
                         , g_menu_modulos.modulo
                    from g_menu 
                    inner join g_menu_modulos on g_menu.modulo = g_menu_modulos.modulo 
                    order by g_menu_modulos.descripcion, g_menu.opcion `

        } else {

            xsql = `select g_menu.idmenu, g_menu.modulo, g_menu.opcion, g_menu.form, g_menu.orden
                        , g_menu_modulos.descripcion as descmodulo 
                        , g_menu_modulos.modulo
                    from g_menu_roles
                    inner join g_menu on g_menu_roles.idmenu = g_menu.idmenu 
                    inner join g_usuarios on g_menu_roles.idrol = g_usuarios.idrol 
                    inner join g_menu_modulos on g_menu.modulo = g_menu_modulos.modulo 
                    where g_menu.idmenu= ? `

        }

        //console.log(xsql)

        
        connDB.query(xsql, [xmenuid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 500,
                    message: xerror,
                  });
;
            } else {
                res.status(200);
                res.json({ results });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const consultarMenuRol = async (req, res) => {

    console.log(req.params)

    try {
        const xrolid = req.params.pid;

        if (xrolid=='') {
            return res.status(404).json({
                error: 0,
                message: '',
              });

        }

        const xsql = `select g_menu.idmenu, g_menu.modulo, g_menu.opcion, g_menu.form
                           , g_menu_modulos.descripcion as modulo 
                           , g_menu_roles.acceso
                    from g_menu_roles
                    inner join g_menu on g_menu_roles.idmenu = g_menu.idmenu 
                    inner join g_menu_modulos on g_menu.modulo = g_menu_modulos.modulo 
                    where g_menu_roles.idrol= ? `

        //console.log(xsql)
        
        connDB.query(xsql, [xrolid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 500,
                    message: xerror,
                  });
;
            } else {
                res.status(200);
                res.json({ results });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const consultarMenuModulo = async (req, res) => {

    try {
            
        const xsql = `select idmenumodulo, descripcion, modulo 
                from g_menu_modulos 
                order by descripcion `

        connDB.query(xsql, null, async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 500,
                    message: xerror,
                  });
;
            } else {
                res.status(200);
                res.json({ results });
            }
        });

    } catch (error) {
        console.log(error);
    }
}


export const guardarMenu = async (req,res) => {

    console.log('guardarMenu:'+JSON.stringify(req.body))

    try {
        const xaccion = req.body.accion;
        const xid = req.body.idmenu;
        let xopcion = req.body.opcion;  xopcion =  xopcion[0].toUpperCase() + xopcion.slice(1).toLowerCase();
        const xmodulo = req.body.modulo;
        const xform = req.body.form;
        const xorden = req.body.orden;

        let xsql = ''
        if (xaccion=='A') {
            xsql = 'INSERT INTO `g_menu`(`modulo`, `opcion`, `form`, `orden`) values (?,?,?,?) '
            connDB.query(xsql, [xmodulo,xopcion,xform,xorden], async (xerror,results)=>{
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
            xsql = 'update g_menu set modulo=?, opcion=?, form=?, orden=? where idmenu= ? '
            connDB.query(xsql, [xmodulo,xopcion,xform,xorden,xid], async (xerror,results)=>{
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

    } catch (error) {
        console.log(error);
    }

}

export const borrarMenu = async (req,res) => {

    console.log(req.params)

    try {
        const xid = req.params.pid;

        let xsql = ''
        if (xid=='') {
            return res.status(404).json({
                error: 0,
                message: xerror,
              });
        } 
            
        
        xsql = 'delete from g_menu_roles where idmenu= ? '
        connDB.query(xsql, [xid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 0,
                    message: xerror,
                  });

            } 
        });

        xsql = 'delete from g_menu where idmenu= ? '
        connDB.query(xsql, [xid], async (xerror,results)=>{
            if (xerror) {
                console.log(xerror);

                return res.status(500).json({
                    error: 0,
                    message: xerror,
                  });

            } 
        });

        res.status(200).json({
            error: 0,
            message: '',
        });


    } catch (error) {
        console.log(error);
    }
}