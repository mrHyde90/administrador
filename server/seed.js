var mongoose = require("mongoose");
var Instrument = require("./models/instrument");

const data = [
		{name: "Foca Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foca Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foca Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foca Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]}
	];

function seedDB() {
	Instrument.remove({})
	.exec()
	.then( instrumentRemoves => {
		data.forEach( seed => {
			Instrument.create(seed)
			.then(newInstrument => console.log(newInstrument))
			.catch(err => console.log(err))
		});
	})
	.catch(err => console.log(err))
}

module.exports = seedDB;