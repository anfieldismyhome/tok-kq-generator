async function generateKQ() {

    const url =
        document.getElementById("urlInput").value.trim();

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

        let html = "";

        if (data.sourceTitle) {

            html += `
                <div class="result-section">
                    <h2>${data.sourceTitle}</h2>
                    <p>${data.summary || ""}</p>
                </div>
            `;
        }

        if (data.sections) {

            data.sections.forEach(section => {

                html += `
                    <div class="result-section">
                        <h2>${section.title}</h2>
                        <ul>
                            ${section.items
                                .map(item => `<li>${item}</li>`)
                                .join("")}
                        </ul>
                    </div>
                `;

            });

        } else {

            html += `
                <div class="error-box">
                    No sections returned.
                </div>
            `;
        }

        results.innerHTML = html;

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
