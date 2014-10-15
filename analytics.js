(function (Firebase) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');
  var activeVisitors = analytics.child('activeVisitors');

  var visitor = {
    path: window.location.pathname,
    arrivedAt: Firebase.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent
  };

  var activeVisitorRef = activeVisitors.push(visitor, function () {
    activeVisitors.child(visitorId).once('value', function (snapshot) {
      visitor.arrivedAt = snapshot.val().arrivedAt;
    });
  });

  var visitorId = activeVisitorRef.name();

  var pastVisitors = analytics.child('pastVisitors');
  visitor.leftAt = Firebase.ServerValue.TIMESTAMP;
  pastVisitors.child(visitorId).onDisconnect().set(visitor);
  activeVisitorRef.onDisconnect().remove();

  var totalVisitors = analytics.child('totalVisitors');
  totalVisitors.once('value', function (snapshot) {
    totalVisitors.set(snapshot.val() + 1);
  });

})(Firebase);
