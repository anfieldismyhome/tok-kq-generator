async function generateKQ() {

    const url = document.getElementById("urlInput").value.trim();

    const loading = document.getElementById("loading");

    const results = document.getElementById("results");

    if (!url) {
        results.innerHTML =
        "<div class='error-box'>Please paste a URL.</div>";
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
                body: JSON.stringify({ url })
            }
        );

        const data = await response.json();

        const parsed = JSON.parse(data.result);

        loading.innerHTML = "";

        const section = (title, items, ordered = false) => `
            <div class="result-section">
                <h2>${title}</h2>
                ${
                    ordered
                    ? `<ol>${items.map(i => `<li>${i}</li>`).join("")}</ol>`
                    : `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`
                }
            </div>
        `;

        results.innerHTML = `
            <div class="results-grid">

                ${section(
                    "Knowledge Questions",
                    parsed.knowledgeQuestions || [],
                    true
                )}

                ${section(
                    "Discussion Questions",
                    parsed.discussionQuestions || [],
                    true
                )}

                ${section(
                    "Knowledge Claims",
                    parsed.knowledgeClaims || []
                )}

                ${section(
                    "Counterclaims",
                    parsed.counterclaims || []
                )}

                ${section(
                    "Perspectives",
                    parsed.perspectives || []
                )}

                ${section(
                    "Biases",
                    parsed.biases || []
                )}

                ${section(
                    "TOK Concepts",
                    parsed.tokConcepts || []
                )}

                ${section(
                    "Exhibition Connections",
                    parsed.exhibitionConnections || []
                )}

            </div>
        `;

    } catch (error) {

        loading.innerHTML = "";

        results.innerHTML = `
            <div class="error-box">
                ${error.message}
            </div>
        `;
    }
}
