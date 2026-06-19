async function generateKQ() {

const url = document.getElementById("urlInput").value.trim();

const userType =
    document.getElementById("userType").value;

const analysisType =
    document.getElementById("analysisType").value;

const sourceType =
    document.getElementById("sourceType").value;

const loading =
    document.getElementById("loading");

const results =
    document.getElementById("results");

if (!url) {

    results.innerHTML =
        "<div class='error-box'>Please enter a URL.</div>";

    return;
}

loading.innerHTML = "Analyzing source...";

results.innerHTML = "";

try {

    const response = await fetch(
        "https://tok-kq-worker.zubinjcoach.workers.dev/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url,
                userType,
                analysisType,
                sourceType
            })
        }
    );

    const data = await response.json();

    loading.innerHTML = "";

    results.innerHTML = `
        <div class="result-section">
            <h2>Worker Response</h2>
            <pre>${data.result}</pre>
        </div>
    `;

    console.log(data);

} catch (error) {

    loading.innerHTML = "";

    results.innerHTML = `
        <div class="error-box">
            ${error.message}
        </div>
    `;

}

}
