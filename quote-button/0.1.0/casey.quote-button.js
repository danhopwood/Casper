var caseySDK = caseySDK || {};

var init = init || function() {
  jQuery(document).ready(function() {
    if (typeof caseySDK.initialised === "undefined") {
      maybeLoadGA();

      // track pageview
      ga('create', 'UA-38450727-3', 'auto', 'caseyTracker');
      ga('caseyTracker.send', 'pageview');

      // create buttons
      var url = jQuery(".casey-quote-button-container").data("url");
      var buttonCopy = jQuery(".casey-quote-button-container").data("buttonCopy");
      jQuery(".casey-quote-button-container").append('<a class="casey-cta-btn" target="_blank" href="' + url + '">' + buttonCopy + '</a>');

      // track button clicks
      jQuery(".casey-cta-btn").click(function() {
        var buttonCopy = jQuery(this).text();
        ga('caseyTracker.send', 'event', 'Quote Request', 'Click', buttonCopy);
      });

      caseySDK.initialised = true;
    }
  });
};

var maybeLoadJq = maybeLoadJq || function() {
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

var maybeLoadGA = maybeLoadGA || function() {
  if (typeof ga === "function" || typeof __gaTracker === "function") {
    if (typeof __gaTracker === "function") {
      window.ga = __gaTracker;
    }
  } else {
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  }
};

if (typeof caseySDK.eventListenerAdded === "undefined") {
  if (window.addEventListener) {
    window.addEventListener('load', maybeLoadJq, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', maybeLoadJq);
  }

  caseySDK.eventListenerAdded = true;
}
