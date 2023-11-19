require('dotenv').config();
const secretConfig = process.env.SECRET_CONFIG
const db= require('../database/conn')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie =require('cookie');

const createUser = async(req, res) =>{
    const {nombre,contrasena,correo_electronico,rol_id} =req.body;
    const salt = await bcrypt.genSalt(250);
    const ContrasenaHash = await bcrypt.hash(contrasena, salt);
    const sql=` INSERT INTO tbl_usuarios(nombre,contrasena,salt,correo_electronico,rol_id)
                VALUES($1,$2,$3,$4,$5)`;
    const values=[nombre,ContrasenaHash,salt,correo_electronico,rol_id];
    try{
        await db.query(sql,values)
        res.status(200).json({
            msg: 'Torneo creado correctamente',
            statusCode: 200
        });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        statusCode: 500
      });
    }
}

const authUser = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    const sql = 'SELECT * FROM tbl_usuarios WHERE correo_electronico = $1';
    const values = [correo_electronico];
  
    try {
      const result = await db.query(sql, values);
  
      if (result.rows.length > 0) {
        const usuario = result.rows[0];
        const isValidPassword = await bcrypt.compare(contrasena, usuario.contrasena);
        if (isValidPassword) {

          const payload = {
            user_name: usuario.user_name,
            email: usuario.correo_electronico,
            id_role: usuario.rol_id,
          };

          const token = jwt.sign(payload, secretConfig, { expiresIn: '1h' });
          const tokenCookie = cookie.serialize('myCookie', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60,
            path: '/',
          });
          res.setHeader('Set-Cookie', tokenCookie);
          res.status(200).json({ mensaje: 'Autenticación Exitosa' });
        } else {
          res.status(401).json({ mensaje: 'Autenticación No Exitosa: Contraseña incorrecta' });
        }
      } else {
        res.status(404).json({ mensaje: 'Autenticación No Exitosa: Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  };


module.exports ={
    createUser,
    authUser
}