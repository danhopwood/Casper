var caseySDK = caseySDK || {};

// check if an event listener has already been added
if (typeof caseySDK.eventListenerAdded === "undefined") {
  if (window.addEventListener) {
    window.addEventListener('load', maybeLoadJq, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', maybeLoadJq);
  }

  caseySDK.eventListenerAdded = true;
}

function maybeLoadJq() {
  var jQ;
  if (!(typeof jQuery !== "undefined" && jQuery !== null)) {
    jQ = document.createElement('script');
    jQ.type = 'text/javascript';
    jQ.onload = jQ.onreadystatechange = init;
    jQ.src = '//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
    return document.body.appendChild(jQ);
  } else {
    return init();
  }
};

function init() {
  jQuery(document).ready(function() {
    if (typeof caseySDK.initialised === "undefined") {
      maybeLoadGA();

      // track pageview
      ga('create', 'UA-38450727-3', 'auto', 'caseyTracker');
      ga('caseyTracker.send', 'pageview');

      // track button clicks
      jQuery(".casey-cta-btn").click(function() {
        var buttonCopy = jQuery(this).text();
        ga('caseyTracker.send', 'event', 'Quote Request', 'Click', buttonCopy);
      });

      caseySDK.initialised = true;
    }
  });
};

function maybeLoadGA() {
  if (typeof ga === "function" || typeof __gaTracker === "function") {
    if (typeof __gaTracker === "function") {
      window.ga = __gaTracker;
    }
  } else {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  }
}
