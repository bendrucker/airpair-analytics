(function (Firebase) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');
  var activeUsers = analytics.child('activeUsers');

  activeUsers.push({
    path: window.location.pathname,
    arrivedAt: Firebase.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent
  });


  var totalVisitors = analytics.child('totalVisitors');
  totalVisitors.once('value', function (snapshot) {
    totalVisitors.set(snapshot.val() + 1);
  });

})(Firebase);
