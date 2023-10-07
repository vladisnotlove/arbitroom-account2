window.addEventListener("load", () => {
    const element = document.getElementById("squareForm");
    const resultElement = element.querySelector("[data-result]");

    element.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) return;

        const formData = new FormData(e.target);
        const a = parseFloat(formData.get("a") as string ?? "0");
        const result = a * a;

        resultElement.textContent = "" + result;
    })
})