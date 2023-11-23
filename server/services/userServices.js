
const sql = require('mssql');
var config = {
    user: 'sa',
    password: 'Ankit@12345',
    server: 'localhost', 
    database: 'Ecommerce',
    trustServerCertificate: true
};
async function findProductFromDb(){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select top 5 * from products order by _id desc`)
        return data.recordset;
    }
    catch(err){
            console.log("Error Are There", err)
            return err;
        }
}
async function addCartToDb(id,userId){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update carts set quantity = quantity+1 where userId = ${userId} And productId = ${id}`)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}
async function findMyOrdersDb(userId){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select p.name,p.price,o.quantity,o.city,o.street,o.state,o.zip,p.imageLink from orders o inner join products p on o.productId = p._id where userId = ${userId};`)
        console.log(data.recordset)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function saveTocart(uid,pid,quantity){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`insert into carts values(${uid},${pid},${quantity})`)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function saveTheUsers(x){
//     const user = new User({
//     username:x.username,
//     name:x.name,
//     password:x.password,
//     email:x.email,
//     telephone:x.telephone,
//     isVerified:false,
//     isAdmin:false,
//     isSeller:false,
//     cart:[]
// });
// user.save();
try{
    const pool = await sql.connect(config);
    console.log("here")
    console.log(x)
    const data = await pool.request().query(`insert into users values('${x.name}','${x.username}','${x.password}','${x.email}',${x.telephone},0,0,0,NULL)`)
}
catch(err){
    console.log("Error Are There", err)
    return err;
}
}
// async function saveToOrders(data,ad){
//     try{
//         const pool = await sql.connect(config);
//         const datas = await pool.request().query(`insert into orders values(${data.userId},${data.productId},${data.quantity},'${ad.street}','${ad.city}','${ad.state}',${ad.zip})`)
//         return data;
//     }
//     catch(err){
//         console.log("Error Are There", err)
//         return err;
//     }
// }
async function fetchMyCartDb(userId){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select c._id,c.quantity,p.price,p.imageLink,p.name,p.detail,c.userId,c.productId,p.quantity - c.quantity as difofq from carts c inner join products p on c.productId = p._id where userId = ${userId}`)
        console.log(data)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function incCartDb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update carts set quantity = quantity+1 where _id = ${id}`)
        console.log(data.rowsAffected[0])
        return data
        //return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function decCartDb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update carts set quantity = quantity-1 where _id = ${id}`)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}
async function deleteFromCartdb(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`delete from carts WHERE _id = ${id}`)
        console.log(typeof(data.rowsAffected[0]))
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}

async function deleteCart(userId){ // not changed yet
    // try{
    //     const data = await Cart.deleteMany({userId:userId})
    //     if(!data) throw new Error('Error');
    //     return data;
    // }
    // catch(err){
    //     console.log("Error Are There", err)
    //     return err;
    // }
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`delete from carts where userId = ${userId}`)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function updatePassdb(id,cpass){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update users set password = '${cpass}' where _id = '${id}'`)
        return data.rowsAffected;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function fetchDataInLimit5Db(c){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`SELECT * FROM products ORDER BY _id OFFSET ${5*c} ROWS FETCH NEXT 5 ROWS ONLY`)
        return data.recordset;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

// async function reduceProductQuantity(pid,qty){
//     try{
//         const pool = await sql.connect(config);
//         const data = await pool.request().query(`
//             update products set quantity = quantity - ${qty} where _id = ${pid};
//         `)
//         return true;
//     }
//     catch(err){
//         console.log("Error Are There", err)
//         return err;
//     }
// }
async function saveToOrdersAndReduceProductQuantity(data,ad,pid,qty){
   console.log(`${data.userId},${data.productId},${data.quantity},'${ad.street}','${ad.city}','${ad.state}',${ad.zipCode}`)
    try{
        const pool = await sql.connect(config);
        const datas = await pool.request().query(`
        BEGIN TRY 
        BEGIN TRANSACTION 
         insert into orders values(${data.userId},${data.productId},${data.quantity},'${ad.street}','${ad.city}','${ad.state}',${ad.zipCode});
         update products set quantity = quantity - ${qty} where _id = ${pid};
         COMMIT TRANSACTION
         END TRY
         BEGIN CATCH
            ROLLBACK TRANSACTION
         END CATCH
         `)
         return datas;
    }
    catch(err){
        console.log("Error Are There", err)
        return new Error('Something Went Wrong');
    }
}


async function checkProductQuantity(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`
            select quantity from products where _id = ${id};
        `)
        console.log(data.recordset[0].quantity)
        return data.recordset[0].quantity;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function orderPlaceValidation(userId){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`
        select c.quantity as cq,p.quantity as pq,p.price as price from carts c inner join products p on c.productId = p._id where userId = ${userId};
        `)
        return data.recordset
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function SetOtp(email,otp){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`update users set otp = ${otp}  where email = '${email}'`)
        console.log(data)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function GetOtp(email){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select otp from users where email = '${email}'`)
        console.log(data)
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function GetOrderTotal(id){
    try{
        const pool = await sql.connect(config);
        const data = await pool.request().query(`select c.quantity,p.price from carts c inner join products p on c.productId = p._id where userId = ${id}`)
        const cart = data.recordset
        var total = 0;
        console.log(cart)
        for(let i = 0 ; i < cart.length ; i++){
            total += cart[i].quantity*cart[i].price
        }
        console.log(total)
        return total;;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}



module.exports = {findProductFromDb,addCartToDb,saveTocart,saveTheUsers,/*saveToOrders*/fetchMyCartDb,incCartDb
,decCartDb,deleteFromCartdb,findMyOrdersDb,deleteCart,updatePassdb,fetchDataInLimit5Db/*reduceProductQuantity*/
,checkProductQuantity,orderPlaceValidation,saveToOrdersAndReduceProductQuantity,SetOtp,GetOtp,GetOrderTotal
};