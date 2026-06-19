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

        const parsed = JSON.parse(data.result);

        loading.innerHTML = "";

        results.innerHTML = `

        <h2>Knowledge Questions</h2>
        <ol>
            ${parsed.knowledgeQuestions.map(item => `<li>${item}</li>`).join("")}
        </ol>

        <h2>Discussion Questions</h2>
        <ol>
            ${parsed.discussionQuestions.map(item => `<li>${item}</li>`).join("")}
        </ol>

        <h2>Knowledge Claims</h2>
        <ul>
            ${parsed.knowledgeClaims.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h2>Counterclaims</h2>
        <ul>
            ${parsed.counterclaims.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h2>Perspectives</h2>
        <ul>
            ${parsed.perspectives.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h2>Biases</h2>
        <ul>
            ${parsed.biases.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h2>TOK Concepts</h2>
        <ul>
            ${parsed.tokConcepts.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h2>Exhibition Connections</h2>
        <ul>
            ${parsed.exhibitionConnections.map(item => `<li>${item}</li>`).join("")}
        </ul>

        `;

    } catch (error) {

        loading.innerHTML = "";

        results.innerHTML =
            "<strong>Error:</strong><br>" + error.message;
    }
}
