(function (Firebase, $) {
  var analytics = new Firebase('https://airpair-analytics-tutorial.firebaseio.com/');

  $(document).on('ready', function () {
    var $totalVisitors = $('#total-visitors');
    var $activeVisitors = $('#active-visitors');
    var $pastVisitors = $('#past-visitors');

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

    var pastVisitors = analytics.child('pastVisitors').endAt().limit(3);
    pastVisitors.on('child_added', function (snapshot) {
      var n = snapshot.name();
      var v = snapshot.val();
      $pastVisitors.prepend(
      '<li id="past-visitor' + n + '">' + n + ':' +
        '<ul>' +
          '<li>Arrived: ' + new Date(v.arrivedAt) + '</li>' +
          '<li>Left: ' + new Date(v.leftAt) + '</li>' +
          '<li>Spent: ' + ((v.leftAt - v.arrivedAt) / 1000) + ' Seconds </li>' +
          '<li>Path: ' + v.path + '</li>' +
          '<li>User Agent: ' + v.userAgent + '</li>' +
        '</ul>' + 
      '</li>'
      );
    });

    activeVisitors.on('child_removed', function (snapshot) {
      $('#active-visitor' + snapshot.name()).remove(); 
    });

    pastVisitors.on('child_removed', function (snapshot) {
      $('#past-visitor' + snapshot.name()).remove(); 
    });

  });

})(Firebase, $);
