(function (Firebase) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');
  var activeUsers = analytics.child('activeUsers');

  activeUsers.push({
    path: window.location.pathname,
    arrivedAt: Firebase.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent
  });


  var activeVisitorsCount = analytics.child('activeVisitorsCount');
  activeVisitorsCount.once('value', function (snapshot) {
    activeVisitorsCount.set(snapshot.val() + 1);
  });
  
})(Firebase);
