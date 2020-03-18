export function DuoAssistant() {
  this.state = {
    active: true,
    name: "Foo",
    auth: "",
    fromLanguage: ""
  };
  var tokenQuery = {
    url: "https://www.duolingo.com",
    name: "jwt_token"
  };

  this._init = () => {
    console.log("init class");
    this._getCookie();
    this.getTranslations("hen");
  };

  this.setState = data => {
    var prevState = this.state;
    console.log("Prev state: ", prevState);
    var newState = { ...prevState, ...data };
    this.state = newState;
    console.log("Updated state: ", this.state);
  };

  // get cookie from browser
  this._getCookie = async () => {
    var cookie = await this._fetchCookie();
    this.setState({ auth: "Bearer " + cookie[0].value });
    console.log(cookie[0]);
  };

  this._fetchCookie = () => {
    var { url, name } = tokenQuery;
    return new Promise(resolve => {
      chrome.cookies.getAll({ url, name }, resolve);
    });
  };

  this.getUrl = str => {
    var l = "sv";
    var q = str;
    var ul = "en";
    var t = Date.now();
    var url = `https://duolingo-lexicon-prod.duolingo.com/api/1/complete?languageId=${l}&query=${q}&uiLanguageId=${ul}&_=${t}`;
    return url;
  };

  this.getTranslations = query => {
    var url = this.getUrl(query);
    console.log(url);
    fetch(url, {
      credentials: "include",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        authorization: this.auth
      }
    })
      .then(r => r.text())
      .then(result => {
        console.log(result);
      });
  };

  this._init();
}

// DuoAssistant.prototype = {
//   init: function() {
//     console.log("init class");
//     // this._getCookie();
//   }
//   // this.init(),
// };

// e = document.getElementById('root')
// e._reactRootContainer._internalRoot.current.memoizedState.element.props.store.getState('user')
// .onChange('henne')
