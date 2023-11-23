
const sql = require('mssql');
var config = {
    user: 'sa',
    password: 'Ankit@12345',
    server: 'localhost', 
    database: 'Ecommerce',
    trustServerCertificate: true
};
async function saveTheSeller(x){
try{
    const pool = await sql.connect(config);
    const data = await pool.request().query(`insert into users values('${x.name}','${x.username}','${x.password}','${x.email}',${x.telephone},1,1,0)`)
    console.log(data);
}
catch(err){
    console.log("Error Are There", err)
    return err;
}
}
async function deleteFromDbAdmin(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`DELETE from products WHERE _id  = ${id};`)
        console.log(data);
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function getAllProdDb(){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`SELECT * from products`)
        console.log(data.recordset);
        return data.recordset
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function UpadteAdminDb(id,x){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update products set name = '${x.productName}',price = ${x.productPrice} ,detail = '${x.productDesc}',quantity =${x.productQty}  where _id = ${id}`)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

module.exports = {saveTheSeller,UpadteAdminDb,deleteFromDbAdmin,getAllProdDb}

