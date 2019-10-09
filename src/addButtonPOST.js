export default class SkipNext {
  constructor() { }
  sendInput() {
    let numericalId = location.href.split('/').pop();
    console.log("numericalId: ", numericalId);
    let postUrl = "http://10.0.0.26:2345/skimo";
    if (numericalId /*&& !isNaN(numericalId)*/) {
      let postJSON = { url: "https://www.netflix.com/watch/" + numericalId, asset_id: numericalId + "" };
      this.httpPostAsync(postUrl, postJSON, this.setButtonTextSuccess);
    } else {
      this.showToastMessage("Skimo failed to generate(1)");
      console.log('false0: Wrong Input');
    }
  };

  setButtonTextSuccess(responseText) {
    try {
      if (responseText && responseText[0]) {
        let obj = JSON.parse(responseText);
        console.log(obj.result)
        if(obj.result == 'Error')
        {
          new SkipNext().showToastMessage('Skimo could not be generated. please check your Netflix user/password');
        }
        else if(obj.result == 'Trial')
        {
          new SkipNext().showToastMessage('You exceeded your quota for the day. Either upgrade to a paid version or try tomorrow');
        }
        else
        {
          new SkipNext().showToastMessage('Skimo was successfully generated. please reload the page');
        }
      }
      else {
        new SkipNext().showToastMessage('Skimo failed to generate(2)');
        console.log('false1: ', responseText);
      }
    } catch (e) {
      console.log(e);
      new SkipNext().showToastMessage('Skimo failed to generate(3)');
      console.log('false2: ', responseText);
    }
  }

  showToastMessage(message = null) {
    if (message) {

      // Adds an element to the document
      var toastMessage = document.createElement('div');
      //toastMessage.setAttribute('id', 'toastMessage');
      toastMessage.setAttribute('style', 'padding:10px;border-radius:5px;position:absolute;bottom:0;background:#223344;box-shadow:3px 3px 5px gray;color:white;opacity: 0;z-index: 999;transition-duration: 0.7s;');
      var toastMessageWrapper = document.getElementById('toastMessageWrapper');
      toastMessageWrapper.appendChild(toastMessage);
      //let toastMessage = document.getElementById('toastMessage');
      toastMessage.innerHTML = message;
      toastMessage.style.opacity = 1;
      toastMessage.style.left = 'calc(50% - ' + (toastMessage.offsetWidth / 2) + 'px)';
      setTimeout(function () {
        toastMessage.style.opacity = 0;
        toastMessageWrapper.removeChild(toastMessage);
      }, 5000);
    }
  }

  httpPostAsync(theUrl, json, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(json));
  }
}
