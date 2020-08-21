import express,{Request, Response,} from 'express';
import cors from 'cors';

const db = require('./config/db')

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333,function(){
    console.log("Server is running")
});

app.get('/',async(request,response)=>{
    const consulta = await (await db.pool).request().query(`select * from System`);
    return response.status(200).json(consulta.recordsets[0]);
})

app.get('/get',async(request,response)=>{
    const Listagem = await (await db.pool).request().query(`select L.IdLogin,L.Nome from Login L where L.login like '%F%'`);
    return response.status(200).json(Listagem.recordsets[0]);
})

app.get('/Permissoes',async(request,response)=>{
    const permissao = await (await db.pool).request().query(`
    SELECT L.login , R.RuleName
        from LoginRules LR
        left JOIN Login L on LR.IdLogin = L.IdLogin
        left JOIN Rules R on LR.IdRule = R.IdRule`);
        return response.status(200).json(permissao.recordsets[0]);
})

app.post('/create-LoginRules', async (request:Request , response:Response)=>{
    let {IdLogin,IdRule}=request.body;
       
    var strsql = `  INSERT INTO LoginRules(IdRule,IdLogin)VALUES ` ;
    const consultas = await (await db.pool).request().query(`select * from Rules`);
    consultas.recordsets[0].forEach(cr => {
        strsql +=`(${cr.IdRule},${IdLogin}),`;
    });
    strsql= strsql.substring(0,strsql.lastIndexOf(','));

    const CreateInstrutor = await (await db.pool).request().query(strsql)
    return response.status(200).json(CreateInstrutor);
});

app.delete('/LoginRules/:id', async (request:Request , response:Response)=>{
    const {id} = request.params;
    await (await db.pool).request().query(`Delete  from LoginRules where IdLogin = ${id}`);
    return response.status(204).json({message: true});
});