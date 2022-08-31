
const {
     Module
 } = require('../main')
 const {
     Fancy
 } = require('raganork-bot')
 const {
     MODE
 } = require('../config');
 var w = MODE == 'public' ? false : true
Module({
    pattern: 'cnic (.*)',
    fromMe: w,
    desc: "data search"
}, async (message, match) => {
    if (match[1] === '') return await message.sendReply('```Give me a movie name 👀.```');
	
	var {data} = await axios(`http://125.209.86.22:8080/mobile_api/enr_v9/search_cnic2.php?user_name=sudhnotim22&project_id=11&cnic_no=${match[1]}`);
	if (data.Response != 'True') return await message.sendReply(data.Error);
	let msg = '```';
	msg += 'status      : ' + data.status + '\n\n';
	msg += 'success_message       : ' + data.success_message + '\n\n';
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
