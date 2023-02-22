let http = require('http');
let fs = require('fs');

const server = http.createServer((req, res) => {
  let method = req.method;
  const url = req.url;
  if (url === '/') {
    res.setHeader('content-type', 'text/html');
    res.write(`<html>
    <body>
      <h1> 
        Hello
      </h1>
      <form action ='/message' method ='POST'>
        <input type='text' name='message'>
          <button type='submit'>
            click
          </button>
        </input>
      </form>
    </body>
    </html>`)
    res.end()
  }
  if (url === '/message' && method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      let parsebody = Buffer.concat(body).toString();
      let mes = parsebody.split('=')[1];
      fs.writeFileSync('message.txt', mes);
    })
    let msg = ""
    fs.readFile('message.txt', (ex, data) => {
      let nmsg = data.toString();
      msg = nmsg
      res.statusCode = 200;
      res.setHeader('content-type', 'text/html');
      console.log(msg)
      res.write(`<html>
    <body>
      <h2> 
        Hello <h1>${msg}</h1>
      </h2>
      <form action ='/message' method ='POST'>
        <input type='text' name='message'>
          <button type='submit'>
            click
          </button>
        </input>
      </form>
    </body>
    </html>`)
      res.end()
    });
  }
})

server.listen(4000);