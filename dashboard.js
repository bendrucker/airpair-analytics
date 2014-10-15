(function (Firebase) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');

  $(document).on('ready', function () {
    var $totalVisitors = $('#total-visitors');
    analytics.child('totalVisitors').on('value', function (snapshot) {
      $totalVisitors.text(snapshot.val());
    });
  });

})(Firebase);
