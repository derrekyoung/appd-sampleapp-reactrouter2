var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var history = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require("../components/Main");
var Home = require("../components/Home");
var PromptContainer = require("../containers/PromptContainer");
var ConfirmBattleContainer = require("../containers/ConfirmBattleContainer");
var ResultsContainer = require("../containers/ResultsContainer");

function sendVPage(vPageName) {
  // Check if ADRUM is defined
  if (typeof ADRUM === "undefined") {
    console.log("ADRUM is undefined");
    return;
  }

  // Parse the URL
  var _location = [
    location.protocol,
    "//",
    location.host,
    location.pathname
  ].join("");

  // Add the hash if not an empty parameter
  if (vPageName && vPageName.length > 0) {
    _location = _location + "#" + vPageName;
  }
  //console.log("sendVPage(): " + vPageName+", URL: "+_location);

  // Build the ADRUM vPageView object
  var vPageView = new ADRUM.events.VPageView({
    url: _location
  });
  vPageView.start();
  vPageView.markViewChangeStart();
  vPageView.markViewChangeEnd();
  vPageView.markViewDOMLoaded();
  vPageView.markXhrRequestsCompleted();
  vPageView.end();

  // Send the VPage to the Platform
  ADRUM.report(vPageView);
  console.log("Virtual page sent: " + _location);
}

history.listen(function(location) {
  console.log("pathname: ", location.pathname + ", search: " + location.search);
  sendVPage();
});

var routes = (
  <Router history={history}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="playerOne" header="Player One" component={PromptContainer} />
      <Route
        path="playerTwo/:playerOne"
        header="Player Two"
        component={PromptContainer}
      />
      <Route path="battle" component={ConfirmBattleContainer} />
      <Route path="results" component={ResultsContainer} />
    </Route>
  </Router>
);

module.exports = routes;
