Foris.update_pakon_data = function(data_type) {
    $.ajax({
        type: 'get',
        url: '{{ url("config_ajax", page_name="pakon") }}',
        data: {
            action: "eventsource", // action: "perform_query",
            query: $("#field-query").val(),
            csrf_token: $("#csrf-token").val()
        },
        dataType: data_type,

    }).done(function(response, status, xhr) {
        if (xhr.status == 200) {
            console.log('teď dostávám výsledky');
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
            window.location.replace(xhr.respo14:b3:1f:18:cb:9b	security.ubuntu.comnseJSON.loginUrl);
            return;
        }
    });
    */
};

Foris.WS["pakon"] = function(msg) {
    // No notifications for pakon right now
};

$(document).ready(function() {
    const ESUrl = '{{ url("config_ajax", page_name="pakon") }}?action=eventsource'
    + '&query=' + encodeURIComponent(document.getElementById('field-query').value);
//    + '&csrf_token=' + encodeURIComponent(document.getElementById('csrf-token').value);

    const evtSource = new EventSource(ESUrl);
    const dataStructure = [];

    evtSource.onmessage = function(event) {
        console.log('zpráva');
    }



    $("#pakon-query-trigger").click(function(e) {
        console.log('c');
        e.preventDefault();
        Foris.update_pakon_data("html");
    });
});
