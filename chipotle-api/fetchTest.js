async function fetchTest(){
	let response = await fetch('https://data.mongodb-api.com/app/data-ktfwi/endpoint/data/v1')
	let data = await response.json()
	console.log(JSON.stringify(data))
}

console.log(fetchTest())