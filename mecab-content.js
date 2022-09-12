const mecabResult = document.createElement("mecab-result");
document.body.appendChild(mecabResult);

const setMarkerPositionMecab = (markerPosition) =>
  mecabResult.setAttribute(
    "markerPosition",
    JSON.stringify(markerPosition)
  );

const getSelectedTextMecab = () => window.getSelection().toString();

button = document.querySelector("medium-highlighter").shadowRoot.querySelector("#mediumHighlighter")
button.addEventListener("click", () => {
  if (getSelectedTextMecab().length > 0) {
    setMarkerPositionMecab(getMarkerPositionMecab());
    chrome.runtime.sendMessage({ greeting: "userInput", input: getSelectedTextMecab() }, function (response) {
      customElem = document.querySelector("mecab-result");
      shadow = customElem.shadowRoot;
      if (!response.check){
      shadow.getElementById("myPopup").innerHTML = `  <div class="container" style="text-align: center">
    <h1 style=color:black;font-size:16px;>${response.output}</h1>
  </div>`;
      }
      else{
      shadow.getElementById("myPopup").innerHTML = `  <div class="container" style="text-align: center">
    <h1 style=color:red;font-size:16px;>Input includes NON Japanese characters.</h1>   
    <h1 style=color:red;font-size:16px;>日本語以外の文字が選択された可能性があります。</h1>  
    <h1 style=color:black;font-size:16px;>${response.output}</h1>
  </div>`;
      }
    });
  }
});

document.addEventListener("selectionchange", () => {
  if (getSelectedTextMecab().length === 0) {
    setMarkerPositionMecab({ display: "none" });
  }
});

function getMarkerPositionMecab() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    left: rangeBounds.left + rangeBounds.width / 2,
    top: rangeBounds.top - 35,
    display: "flex",
  };
}
