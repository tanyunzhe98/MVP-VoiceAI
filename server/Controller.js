const express = require("express");
const API = require('./API.js');

const submitText = (req, res) => {
const params = req.body;
//console.log('params:',params)
API.submitText(params,(err, response)=> {
if (err) {
res.status(500).send(err);
} else {
res.status(201).send(response);
}
})
}

module.exports =  {
submitText
};





