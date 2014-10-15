(function (Firebase) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');

  $(document).on('ready', function () {
    var $totalVisitors = $('#total-visitors');
    var $activeVisitors = $('#active-visitors');

    analytics.child('totalVisitors').on('value', function (snapshot) {
      $totalVisitors.text(snapshot.val());
    });

    var activeVisitors = analytics.child('activeVisitors');
    activeVisitors.on('child_added', function (snapshot) {
      var n = snapshot.name();
      var v = snapshot.val();
      $activeVisitors.prepend(
      '<li id="active-visitor' + n + '">' + n + ':' +
        '<ul>' +
          '<li>Arrived: ' + new Date(v.arrivedAt) + '</li>' +
          '<li>Path: ' + v.path + '</li>' +
          '<li>User Agent: ' + v.userAgent + '</li>' +
        '</ul>' + 
      '</li>'
      );
    });

  });

})(Firebase);
