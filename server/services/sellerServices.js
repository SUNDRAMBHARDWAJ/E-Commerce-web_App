const sql = require('mssql');
var config = {
    user: 'sa',
    password: 'Ankit@12345',
    server: 'localhost', 
    database: 'Ecommerce',
    trustServerCertificate: true
};
async function savetheproductdb(x){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`insert into products values('${x.name}','${x.ilink}',${x.price},'${x.des}',${x.qty},${x.sellerId})`)
        console.log(data);
        return;
    }
    catch(err){
        console.log("Error Are There", err)
        return new Error('There are Errors');
    }
}
async function updateTheProductDb(id,x){
    
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update products set name = '${x.productName}',price = ${x.productPrice} ,detail = '${x.productDesc}',quantity =${x.productQty}  where _id = ${id}`)
        return data.rowsAffected;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function recieveTheOrderDb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`
        select products.name as pname,products.imageLink,users.name as usname,products.price,
        orders.quantity,users.telephone,users.email,orders.street,orders.city,
        orders.state,orders.zip from orders join users on orders.userId = users._id
        join products on orders.productId = products._id where products.SellerId = ${id};
        `)
        console.log(data.recordset)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function getMyProductDb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`SELECT * from products WHERE SellerId = ${id};`)
        console.log(data.recordset);
        return data.recordset
    }
    catch(err){
        console.log("Error Are There", err)
        return new Error('There are Errors');
    }

}

async function deleteMyProductDb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`DELETE from products WHERE _id  = ${id};`)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
module.exports = {savetheproductdb,updateTheProductDb,getMyProductDb,deleteMyProductDb,recieveTheOrderDb}