const http = require('http');

const fs = require('fs');

const requestHandler = ((req, res) => {
    const url = req.url;
   const method = req.method;

    if(url == '/'){
res.write('<html>');
res.write('<head><tittle>Enter Message</tittle></head>');
res.write(
  '<body><form action="/message" method="POST"><input type = "text" name= "message"><button type="submit">Send</button></form></body>'
  );
res.write('</html');
return res.end();
  
}

if (url === '/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) =>{
        console.log(chunk);
  body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
      res.statusCode = 302;
      res.setHeader('Location', '/')
    return res.end();
      });
    });
}
//  console.log(req.url, req.method, req.headers);
//  process.exit();

res.setHeader('Content-Type', 'texy/html');
res.write('<html>');
res.write('<head><tittle>My First Page</tittle></head>');
res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
res.write('</html');
res.end();


});

// module.exports = requestHandler;


//   module.exports = {
//     handler:requestHandler,
//     someText: 'Some hard coded text'
//   };


// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text'

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';