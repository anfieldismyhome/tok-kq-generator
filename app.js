async function generateKQ() {

    const url = document.getElementById("urlInput").value;

    const loading = document.getElementById("loading");

    const results = document.getElementById("results");

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
                body: JSON.stringify({ url })
            }
        );

        const data = await response.json();

        loading.innerHTML = "";

        results.innerHTML = data.result;

    } catch (error) {

        loading.innerHTML = "";

        results.innerHTML =
            "Error: " + error.message;
    }
}
