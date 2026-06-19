async function generateKQ(){

const url =
document.getElementById("urlInput").value;

const loading =
document.getElementById("loading");

const results =
document.getElementById("results");

loading.innerHTML = "Analyzing...";

results.innerHTML = "";

const response = await fetch(
"https://YOUR-WORKER.workers.dev/analyze",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({url})
}
);

const data = await response.json();

loading.innerHTML = "";

results.innerHTML = data.result;

}
