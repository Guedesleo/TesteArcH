import express,{Request, Response,} from 'express';
import cors from 'cors';

const db = require('./config/db')

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333,function(){
    console.log("Server is running")
});

app.get('/sistemas',async(request,response)=>{
    // const consulta = await (await db.pool).request().query(`select * from System`);
    // return response.status(200).json(consulta.recordsets[0]);
    const consultar = await db.query(`select * from System`);
    return response.status(200).json(consultar.rows);
})

app.get('/users',async(request,response)=>{
    const Listagem = await db.query(`select L.IdLogin,L.Nome from Login L where L.login like '%A%'`);
    return response.status(200).json(Listagem.rows);
})

app.get('/Permissoes',async(request,response)=>{
    const permissao = await db.query(`
    SELECT * from Rules`);
        return response.status(200).json(permissao.rows);
})

app.post('/create-LoginRules', async (request:Request , response:Response)=>{       
    let {idlogin}=request.body;
       
    var strsql = `  INSERT INTO LoginRules(IdRule,IdLogin)VALUES ` ;
    const consultas = await db.query(`select * from Rules`);

    consultas.rows.forEach(cr => {
        strsql +=`(${cr.idrule},${idlogin}),`;
    });
    strsql= strsql.substring(0,strsql.lastIndexOf(','));

    await db.query(strsql)
    return response.status(200).json({sucess:true});
});

app.delete('/delete-LoginRules/:id', async (request:Request , response:Response)=>{
    const {id} = request.params;
    await db.query(`Delete  from LoginRules where IdLogin = ${id}`);
    return response.status(204).json({message: true});
});
