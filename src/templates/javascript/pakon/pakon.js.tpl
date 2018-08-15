if (typeof(Worker) == "undefined") {
    alert("{{ trans("Your browser doesn't support web workers, get a browser from this milenia") }}")
} else {

var wrk = new Worker("{{ static("plugins/pakon/js/data_manager.js") }}");
var sort_by = [0, 1];
var hosts = [];
var from;
var to;
var page_size = 25;
var clients = [];
var filter_changed = true;
var date_changed = true;

function toogle_lines(line) {
    if($('#line_' + line + ' td i').attr('class') == 'fas fa-plus') {
        $('.extra_' + line).show();
        $('#line_' + line + ' td i').removeClass('fa-plus').addClass('fa-minus');
    } else {
        $('.extra_' + line).hide();
        $('#line_' + line + ' td i').addClass('fa-plus').removeClass('fa-minus');
    }
}

function toogle_sort(by) {
    dnd();
    if(by === sort_by[0]) {
        sort_by[1] = sort_by[1] > 0 ? -1 : 1;
    } else {
        sort_by[0] = by;
        if(by > 1 && by < 5) {
            sort_by[1] = 1;
        } else {
            sort_by[1] = -1;
        }
    }
    wrk.postMessage({
        'command': 'sort',
        'sort_by': sort_by
    });
}

function goto_page(i) {
    dnd();
    wrk.postMessage({
        'command': 'page',
        'page_size': page_size,
        'page': i
    });
}

function filter() {
    if(!filter_changed)
        return;
    hosts = $('#hostname-filter').val().split(",").map(function (e) {
        console.log('Filtering hosts with ' + e.trim());
        return new RegExp(e.trim())
    });
    clients = $('#client-filter').val().split(",").map(function (e) {
        console.log('Filtering clients with ' + e.trim());
        return new RegExp(e.trim())
    });
}

function get_time_vars() {
    let time_from = $('#time-from').val();
    if(time_from == "") {
        $('#time-from').val('00:00:00.00');
        time_from = "00:00:00";
    }
    from = Date.parse($('#date-from').val() + ' ' + time_from);
    let time_to = $('#time-to').val();
    if(time_to == "") {
        $('#time-to').val('00:00:00.00');
        time_to = "00:00:00";
    }
    to = Date.parse($('#date-to').val() + ' ' + time_to);
}

function apply() {
    dnd();
    filter();
    get_time_vars();
    let command = {
        'command': 'change'
    };
    command.ajax_url = '{{ url("config_ajax", page_name="pakon") }}';
    command.aggregate = $('#aggregate').val();
    if(filter_changed) {
        command.filter_hosts = hosts;
        command.filter_clients = clients;
    }
    if(date_changed) {
        command.date_from = Math.floor(from / 1000);
        command.date_to = Math.floor(to / 1000);
    }
    console.log(command);
    wrk.postMessage(command);
    date_changed = false;
    filter_changed = false;
}

function dnd() {
    $("#spinner").addClass('spinner');
    $("#tagcloud").css("height", '0px');
    $("#apply-changes").prop("disabled", true);
    $("#pakon-table-data").html('');
}

function available() {
    $("#apply-changes").prop("disabled", false);
    $("#spinner").removeClass('spinner');
}

function zp(data) {
    if(data < 9) {
        return '0' + data;
    } else {
        return '' + data;
    }
}

$(document).ready(function () {
    dnd();
    $(".sortable i").addClass("fa fa-sort");
    for(let i = 0; i < 7; i++) {
        $(".sortable").eq(i).on("click", {
            value: i
        }, function (event) {
            dnd();
            toogle_sort(event.data.value);
        });
    }
    var dt_now = new Date(Date.now());
    $('#date-to').val('' + dt_now.getFullYear() + '-' + zp(dt_now.getMonth() + 1) + '-' + zp(dt_now.getDate()));
    $('#time-to').val('' + zp(dt_now.getHours()) + ':' + zp(dt_now.getMinutes()));
    dt_now.setTime(dt_now.getTime() - 24 * 3600 * 1000);
    $('#date-from').val('' + dt_now.getFullYear() + '-' + zp(dt_now.getMonth() + 1) + '-' + zp(dt_now.getDate()))
    $('#time-from').val('' + zp(dt_now.getHours()) + ':' + zp(dt_now.getMinutes()));
    apply();
    wrk.onmessage = function (e) {
        console.log('Message received from worker');
        console.log(e.data);
        if(e.data.pager) {
            $("#pakon-pager-page").html(e.data.pager);
        }
        if(e.data.page_size) {
            $("pakon-pager-pagesize").val(e.data.page_size);
            page_size = e.data.page_size;
        }
        if(e.data.word_list && e.data.word_list[0]) {
            $("#tagcloud").css("height", '750px');
            $("#tagcloud").css("width", '750px');
            $("#tagcloud").css("margin-left", '-375px');
            $("#tagcloud").css("left", '50%');
            $('#tagcloud').jQWCloud({
                words: e.data.word_list,
                word_mouseOver: function () {
                    $(this).css("text-decoration", "underline");
                },
                word_mouseOut: function () {
                    $(this).css("text-decoration", "none");
                },
                word_click: function () {
                    let filter = $(this).text();
                    filter_changed = true;
                    if($("#hostname-filter").val() == "") {
                        $("#hostname-filter").val(filter);
                    } else {
                        $("#hostname-filter").val($("#hostname-filter").val() + ', ' + filter);
                    }
                }
            });
        } else {
            $("#tagcloud").css("height", '0px');
        }
        if(e.data.sort_by) {
            available();
            sort_by = e.data.sort_by;
            $(".sortable i").removeClass("fa-sort-up").removeClass("fa-sort-down").addClass("fa-sort");
            $("th.sortable:eq(" + sort_by[0] + ") i").removeClass("fa-sort").addClass(sort_by[1] < 0 ? "fa-sort-down" : "fa-sort-up");
        }
        if(e.data.table) {
            $("#pakon-table-data").html(e.data.table);
            available();
        }

    };
});

}
