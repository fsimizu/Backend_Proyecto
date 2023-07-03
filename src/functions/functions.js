import * as fs from 'fs';

export function readCartsFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/dao/db/carts.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const cartList = JSON.parse(data);
          resolve(cartList);
        }
      });
    });
  }

export function readProductsFile() {
return new Promise((resolve, reject) => {
    fs.readFile('./src/dao/db/products.json', 'utf8', (err, data) => {
    if (err) {
        reject(err);
    } else {
        const prodList = JSON.parse(data);
        resolve(prodList);
    }
    });
});
}


// export function checkLogin(req, res, next) {

//   if (req.session.user) {
//     return next();
//   } else {
//     return res.status(401).send('Authorization error');
//   }
// }