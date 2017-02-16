
var http = require("http");
var pg = require("pg");
var conString = "pg://postgres:123456@localhost:5432/tcc";
var r = '';


http.createServer(function (request, response) {


	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT id, nome FROM tb_item");
	query.on("row", function (row, result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		console.log(JSON.stringify(result.rows, null, "    "));
		client.end();
		r = JSON.stringify(result.rows, null, "    ");
	});

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {"Content-Type": "application/json"});
   
   // Send the response body as "Hello World"
   //response.end('Hello World\n');
   
   response.end(r);
   console.log("fim");
   
}).listen(7081);

// Console will print the message
console.log('Server running at http://127.0.0.1:7081/');