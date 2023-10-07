window.addEventListener("load", () => {
    document.querySelectorAll(".alert-button").forEach(element => {
        element.addEventListener("click", (e) => {
            // @ts-ignore
            alert(e.currentTarget.textContent);
        })
    })
})