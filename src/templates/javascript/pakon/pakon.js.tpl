Foris.update_pakon_data = function(data_type) {
  $.ajax({
    type: 'post',
    url:'{{ url("config_ajax", page_name="pakon") }}',
    data: {
      action: "perform_query",
      query: $("#field-query").val(),
      csrf_token: $("#csrf-token").val()
    },
    dataType: data_type,

  }).done(function(response, status, xhr) {
    if (xhr.status == 200) {
      $("#pakon-results").replaceWith(response);  // replace the table
    }
  }).fail(function(xhr) {
    if (xhr.responseJSON && xhr.responseJSON.loggedOut && xhr.responseJSON.loginUrl) {
      window.location.replace(xhr.responseJSON.loginUrl);
      return;
    }
  });
  /*
  $.post(
      '{{ url("config_ajax", page_name="pakon") }}', {
      action: "perform_query",
      query: $("#field-query").val(),
      csrf_token: $("#csrf-token").val()
    }).done(function(response, status, xhr) {
      if (xhr.status == 200) {
        $("#pakon-results").replaceWith(response);  // replace the table
      }
    })
    .fail(function(xhr) {
      if (xhr.responseJSON && xhr.responseJSON.loggedOut && xhr.responseJSON.loginUrl) {
        window.location.replace(xhr.responseJSON.loginUrl);
        return;
      }
    });
  */
};
Foris.WS["pakon"] = function(msg) {
    // No notifications for pakon right now
};

$(document).ready(function() {
  $("#pakon-query-trigger").click(function(e) {
    e.preventDefault();
    Foris.update_pakon_data("html")
  });
});

