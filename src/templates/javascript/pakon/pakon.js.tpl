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

    function refreshDataStructure() {
        document.getElementById('n-items').firstElementChild.textContent = Object.keys(dataStructure).length;
        const macs = [];
        const remoteServices = [];
        for (const i in dataStructure) {
            macs.push(dataStructure[i][2]);
            remoteServices[dataStructure[i][3]] = ++remoteServices[dataStructure[i][3]] || 0;
        }
        console.log(remoteServices);
        document.getElementById('n-macs').firstElementChild.textContent = countUnique(macs);
    }

    function countUnique(iterable) {
        return new Set(iterable).size;
    }

    function getDataStructure() {
        const dataStructure = [];
        const sourceTable = document.getElementById('pakon-results-table').tBodies[0]; // first tbody
        rowsLoop:
        for (let i = 0; i < sourceTable.rows.length; i++) {
            const cells = sourceTable.rows[i].children;
            const cellsData = [];
            cellsLoop:
            for (let ii = 0; ii < cells.length; ii++) {
                cellsData.push(cells[ii].textContent);
            }
            dataStructure[cellsData.join('')] = cellsData; // @todo : md5(cellsData.join(''))
        }
        return dataStructure;
    }

    const dataStructure = getDataStructure();
    refreshDataStructure();

    const ESUrl = '{{ url("config_ajax", page_name="pakon") }}?action=eventsource'
    + '&query=' + encodeURIComponent(document.getElementById('field-query').value);
//    + '&csrf_token=' + encodeURIComponent(document.getElementById('csrf-token').value);

    let evtSource = new EventSource(ESUrl);

    function eventMessage(event) {
        const messageArray = JSON.parse(event.data);
        dataStructure[messageArray.join()] = messageArray;
        refreshDataStructure();

        evtSource.close();
        evtSource = new EventSource(ESUrl + '&timeout=' + Math.round(+new Date()/1000));
        evtSource.onmessage = eventMessage; // regenerate
    }
    evtSource.onmessage = eventMessage;

    $("#pakon-query-trigger").click(function(e) {
        e.preventDefault();
        Foris.update_pakon_data("html");
    });

});
