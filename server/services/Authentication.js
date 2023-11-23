const sql = require('mssql');
var config = {
    user: 'sa',
    password: 'Ankit@12345',
    server: 'localhost', 
    database: 'Ecommerce',
    trustServerCertificate: true
};

async function findOneuser(username){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select * from users where username = '${username}'`)
        console.log(data)
        return data.recordset[0];
    }
    catch{
        console.log("Error Are There", err)
        return err;
    }
}
async function verification(email){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update users set isVerified = 1 where email = '${email}';`)
        console.log(data)
        return data
    }  catch{
        console.log("Error Are There", err)
        return err;
    }
}
module.exports = {findOneuser,verification}