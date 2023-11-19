const db= require('../database/conn');

const createPost = async (req,res) =>{
    const {post, user_id}=req.body;
    const values=[post, user_id];
    const sql=`INSER INTO postInfo(post, user_id)
               VALUES($1,$2)`;
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

const deletePost = async (req, res) =>{
    const id =req.params.id;
    try {
        const sql = 'DELETE FROM postInfo WHERE id = $1 RETURNING *';
        const result = await db.query(sql, id);
    
        if (result.length <= 0) {
          res.json({ error: 'El post no existe'});
        } else {
          res.json({message: 'Post eliminado con exito' });
        }
    
      } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({ error: 'Error al eliminar el post' });
      }
}

module.exports={
    createPost,
    deletePost
}