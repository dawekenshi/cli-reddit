console.log("\n🌌 Welcome to my cli version of reddit enjoy it 🌌\n");

const prompt = require("prompt-sync")({ sigint: true });

let subreddit = prompt("Please input subreddit: ");
console.log("\n");

fetch(`https://www.reddit.com/r/${subreddit}.json`).then((response) =>{
	return response.json();
}).then((response) => {
	if(response.data.children < 10){
		for(let i = 0; i < response.data.children.length; i++){
			console.log(`${i})) `+response.data.children[i].data.title);
			console.log(response.data.children[i].data.author+"\n");
		}	
	}else {
		for(let i = 0; i <= 10; i++){
			console.log(`${i}) `+response.data.children[i].data.title);
			console.log(response.data.children[i].data.author+"\n");
		}
	}
	return response;
}).then((response) => {
	function posts(){
		console.log("\n");
		console.log("Input q to exit\n");
		let post = prompt("Which post do you want to see? [0-10] ");
		console.log("\n");
		if(post > 10 || post < 0){
			console.log("Try again with a valid number between 0 and 10\n");
		}else if(post.toLowerCase() == "q"){
			return "";
		}else{
			console.log(response.data.children[post].data.title+"\n");
			console.log(response.data.children[post].data.author);
			console.log(`NSFW: `+response.data.children[post].data.over_18);
			console.log(response.data.children[post].data.thumbnail);
			console.log(`Spoiler: `+response.data.children[post].data.spoiler);
			console.log(`Comments: `+response.data.children[post].data.num_comments);
		}
		posts();
	}
	posts();
}).catch(() => {
	console.log("Subreddit not found");
})
