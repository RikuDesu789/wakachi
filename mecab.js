const templateMecab = `
  <div id="mecab">
   <div class="popuptext" id="myPopup">LOADING...</div>
  </div>
`;

const styledMecab = ({ display = "none", left = 0, top =0, height =0, width = 0 }) =>`
  #mecab {
    align-items: center;
    background: rgba(250,250,250);
    border-radius: 10px;
    border: 1px solid black;
    width: fit-content(20em);
    min-height: 30px;
    display: ${display};
    justify-content: flex;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    z-index: 9999;
  },
`;


class MecabResult extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const mecabstyle = document.createElement("style");
    mecabstyle.textContent = styledMecab({});
    this.shadowRoot.appendChild(mecabstyle);
    this.shadowRoot.innerHTML += templateMecab;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styledMecab(this.markerPosition);
    }
  }

  handleResponse(message) {
  console.log(`Message from the background script: ${message.response}`);
 }

handleError(error) {
  console.log(`Error: ${error}`);
 }
}

window.customElements.define("mecab-result", MecabResult);

