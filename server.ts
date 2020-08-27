import express,{Request, Response, request, response,} from 'express';
import cors from 'cors';

const db = require('./config/db')

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333,function(){
    console.log("Server is running")
});

app.get('/sistemas',async(request,response)=>{
    const consultar = await db.query(`select * from System`);
    return response.status(200).json(consultar.rows);
})

app.get('/users',async(request,response)=>{
    const {login} = request.query; 

    const strSQL = `select L.IdLogin,L.Nome from Login L where lower(L.login) like lower('${login}%') or lower(Nome) like lower('${login}%')`;
    const Listagem = await db.query(strSQL);
    
    return response.status(200).json(Listagem.rows);
})

app.get('/Permissoes',async(request,response)=>{
    const{idsystem}=request.query;
    const permissao = await db.query(`SELECT * from Rules where idsystem=${idsystem}`);
        return response.status(200).json(permissao.rows);
})

app.get('/grupodeselecao',async(request,response)=>{
    const {idLogin , idsystem}= request.query;
    const grupodeselecao = await db.query(`select R.idrule, R.rulename from LoginRules LR
    inner JOIN Rules R on LR.IdRule = R.IdRule 
    where idsystem=${idsystem} and idlogin =${idLogin}`);
    return response.status(200).json(grupodeselecao.rows);
   
})

app.post('/create-LoginRules', async (request:Request , response:Response)=>{       
    const {idLogin,sistemas}=request.body;
    var strsql = `  INSERT INTO LoginRules(IdRule,IdLogin)VALUES ` ;
    sistemas.forEach(sistema => {
        strsql +=`(${sistema},${idLogin}),`;
    });
    strsql= strsql.substring(0,strsql.lastIndexOf(','));

    await db.query(strsql)
    return response.status(200).json({sucess:true});
});

app.delete('/delete-LoginRules/:id', async (request:Request , response:Response)=>{
    const {id} = request.params;
    const {idrule}= request.body;
    var strsql =` delete  from LoginRules LR where idlogin =${id} and idrule in (${idrule})`
    await db.query(strsql);
    return response.status(204).json({message: true});
    
});
