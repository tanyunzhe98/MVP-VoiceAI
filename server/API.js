const axios = require ('axios'); // .require("dotenv").config(); .env config
//const openai = require('openai');
const { Configuration, OpenAIApi } = require("openai");
// openai.api_key = apiKey;
const configuration = new Configuration({
  apiKey: "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",
});

const submitText = (params, callback) => {
  //console.log(params.input_text);
  const openai = new OpenAIApi(configuration);
  openai.createCompletion({
    model: "text-davinci-003",
    prompt: params.input_text,
    max_tokens: 100,
    temperature: 0.5,
    frequency_penalty: 0.0,
  }).then((response) => {
    // do something with the response
    console.log(response.data.choices[0].text);
    callback(null, response.data.choices[0].text);
  })
  .catch(error => {
       callback(error);
  });
  // axios.post('https://api.openai.com/v1/completions', {
  // "model": "text-davinci-003",
  // "prompt": params.input_text,
  // "temperature": 0.5,
  // "max_tokens": 60,
  // "stop": ["\n", "User:"],
  // "n": 1,
  // "timeout": 20
  // }, {
  // headers: {
  // 'Content-Type': 'application/json',
  // 'Authorization': 'Bearer ' + apiKey
  // }
  // })
  // .then(response => {
  //   console.log(response.data.choices[0].text);
  //   callback(null, response.data.choices[0].text);
  // })
  // .catch(error => {
  //   callback(error);
  // });
}

module.exports = {
  submitText
}