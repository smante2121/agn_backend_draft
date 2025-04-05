import "../style/modal.css"

// returns a modal with a header and body
// title = text shown in the title of the modal
// description = text shown in the body of the modal
function makeModalCallback(title, description) {
    function modalCallback() {
        let modalOuter = document.createElement("div");
        modalOuter.classList.add("modalOuter");

        let modalInner = document.createElement("div");
        modalInner.classList.add("modalInner")

        let modalTitle = document.createElement("span");
        modalTitle.classList.add("modalTitle");
        modalTitle.innerText = title;


        let modalCloseButton = document.createElement("button");
        modalCloseButton.classList.add("modalCloseButton");
        modalCloseButton.innerHTML = "X"
        modalCloseButton.onclick = function () {
            this.parentElement.parentElement.remove();
        };


        let modalDescription = document.createElement("p");
        modalDescription.classList.add("modalDescription");
        modalDescription.innerText = description;


        modalInner.append(modalTitle);
        modalInner.append(modalCloseButton);
        modalInner.append(modalDescription);
        modalOuter.append(modalInner);

        document.body.append(modalOuter);
    }

    return modalCallback;
}

export default makeModalCallback