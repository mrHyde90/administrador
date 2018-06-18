const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	instruments = [
		{_id: "a00516280", name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{_id: "a00516281", name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{_id: "a00516282", name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{_id: "a00516283", name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{_id: "a00516284", name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{_id: "a00516285", name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{_id: "a00516286", name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{_id: "a00516287", name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{_id: "a00516288", name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]}
	];
	res.status(200).json(instruments);
});

module.exports = router;