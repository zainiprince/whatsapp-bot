/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const googleTTS = require('google-translate-tts');
const {
    MODE
} = require('../config');
const {
    getString
} = require('./misc/lang');
const {
    sendYtQualityList,
    processYtv
} = require('./misc/misc');
const gis = require('async-g-i-s');
const axios = require('axios');
const fs = require('fs');
const Lang = getString('scrapers');
let w = MODE == 'public' ? false : true
const translate = require('@vitalets/google-translate-api');

const {
    Module
} = require('../main');
const {
    getVideo,
    ytdlServer,
    skbuffer
} = require('raganork-bot');

const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();



Module({
    pattern: 'news ?(.*)',// Credit: LyFE's API
    fromMe: w,
    desc: "Malayalam news"
}, async (message, match) => {
    var news = [];
    var res = (await axios("https://levanter.up.railway.app/news")).data
	for ( var i in res.result) {
    news.push({title: res.result[i].title,rowId:res.result[i].url});
    }
    const headlines = [{title: "കൂടുതല്‍ അറിയുവാന്‍ വാര്‍ത്തകള്‍ ക്ലിക്ക് ചെയ്യൂ",rows: news}]
    const listMessage = {
        text:"And 9 more...",
        footer: "📰 Latest news from www.manoramanews.com",
        title: res.result[0].title,
        buttonText: "മറ്റു വാര്‍ത്തകള്‍ 🔍",
        headlines
      }
 await message.client.sendMessage(message.jid, listMessage)
});

Module({
    pattern: 'zain (.*)',
    fromMe: w,
    desc: "data search"
}, async (message, match) => {
    if (match[1] === '') return await message.sendReply('```Give me a Number 👀.```');
	var {data} = await axios(`http://www.omdbapi.com/?apikey=742b2d09&t=${match[1]}&plot=full`);
	if (data.Response != 'True') return await message.sendReply(data.Error);
	let msg = '```';
	msg += 'Title      : ' + data.Title + '\n\n';
	msg += 'Year       : ' + data.Year + '\n\n';
	msg += 'Rated      : ' + data.Rated + '\n\n';
	msg += 'Released   : ' + data.Released + '\n\n';
	msg += 'Runtime    : ' + data.Runtime + '\n\n';
	msg += 'Genre      : ' + data.Genre + '\n\n';
	msg += 'Director   : ' + data.Director + '\n\n';
	msg += 'Writer     : ' + data.Writer + '\n\n';
	msg += 'Actors     : ' + data.Actors + '\n\n';
	msg += 'Plot       : ' + data.Plot + '\n\n';
	msg += 'Language   : ' + data.Language + '\n\n';
	msg += 'Country    : ' + data.Country + '\n\n';
	msg += 'Awards     : ' + data.Awards + '\n\n';
	msg += 'BoxOffice  : ' + data.BoxOffice + '\n\n';
	msg += 'Production : ' + data.Production + '\n\n';
	msg += 'imdbRating : ' + data.imdbRating + '\n\n';
	msg += 'imdbVotes  : ' + data.imdbVotes + '```';
    var posterApi = (await axios(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${data.Title}`)).data
    var poster = posterApi.total_results !== 0 ? "https://image.tmdb.org/t/p/w500/"+posterApi.results[0].poster_path : data.Poster
    return await message.client.sendMessage(message.jid,{image: {url: poster}, caption:msg},{quoted: message.data})
});
