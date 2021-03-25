const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const app = express();
port = 7000;

app.get('/', (req, res) => {

  app.use(express.static('public'));	
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  //since we are in a request handler function
  //we're using readFile instead of readFileSync
  fs.readFile('ProductPage.html', 'utf-8', function(err, content) {
  	
  if (err) {
      res.end('error occurred');
      return;
    }

    var data =  { 
    step1 : {
    	name : "Coton",
    	country : "Suisse",
    	startDate : "01/01/20",
    	endDate : "10/01/20"
    },
    step2 : {
    	name : "Egrenage",
    	country : "France",
    	startDate : "12/01/20",
    	endDate : "22/01/20"
    },
    step3 : {
    	name : "Filature",
    	country : "Allemagne",
    	startDate : "23/01/20",
    	endDate : "1/02/20"
    },
    step4 : {
    	name : "Manufacture",
    	country : "Roumanie",
    	startDate : "04/02/20",
    	endDate : "08/02/20"
    },
    step5 : {
    	name : "Expédition",
    	country : "Italie",
    	startDate : "08/03/20",
    	endDate : "23/03/20"
    },
    product : {
    	name :"Oxford shirt",
    	reference :"3056702",
    	price :"99,00",
    	link :"Oxford_Shirt.jpg"

    }
};


    var renderedHtml = ejs.render(content, data);  //get redered HTML code
    res.end(renderedHtml, 'utf-8');
  });
})

app.listen(port, () => {
	console.log(Buffer.isEncoding('utf8'));
	console.log(`app listening at http://localhost:${port}`)
})
main();


			//steps.add(new Step("Coton", "Suisse", simpleDateFormat.parse("01-01-2020"),simpleDateFormat.parse("10-01-2020")));
			//steps.add(new Step("Egrenage", "France", simpleDateFormat.parse("12-01-2020"),simpleDateFormat.parse("20-01-2020")));
			//steps.add(new Step("Filature", "Allemagne", simpleDateFormat.parse("21-01-2020"),simpleDateFormat.parse("10-02-2020")));
			//steps.add(new Step("Manufacture", "Roumanie", simpleDateFormat.parse("12-02-2020"),simpleDateFormat.parse("14-02-2020")));
			//steps.add(new Step("Expédition", "Italie", simpleDateFormat.parse("30-03-2020")));
