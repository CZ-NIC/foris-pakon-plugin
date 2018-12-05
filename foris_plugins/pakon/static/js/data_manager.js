var full_data = [];
var sort_by = [0, -1];
var page = 0;
var page_size = 200;
var limit = 20;
var filtered_data = [];
var aggregated_data = [];
var filter_hosts = [];
var filter_clients = [];
var aggregate_by = 'hostname';
var word_list = {};
var word_list_txt = [];

function format_data(data) {
    const BASE = 1024;
    const RIDGE = '\u00A0'; // NO-BREAK SPACE
    const SIZES = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']; // @todo : add abbr title for units
    const getMeasurementUnit = Math.floor(Math.log(Number(data)) / Math.log(BASE));
    if (Number(data) == 0) {
        return '0' + RIDGE + SIZES[0];
    }
    return parseFloat((Number(data) / Math.pow(BASE, getMeasurementUnit)).toFixed(2)) + RIDGE + SIZES[getMeasurementUnit];
}

function zero_pad(data) {
    if(data < 10) {
        return '0' + data;
    }
    return data;
}

function time_interval(data) {
    let h = Math.floor(data / 3600);
    let m = Math.floor((data - h * 3600) / 60);
    let s = Math.floor(data - h * 3600 - m * 60);
    return zero_pad(h) + ':' + zero_pad(m) + ':' + zero_pad(s);
}

function shorten(data) {
    if(data.length > 30) {
        return '...' + data.substring(data.length - 27);
    }
    return data;
}

function render_entry(data) {
    let table = '';
    for(y in data) {
        switch (y) {
        case '1':
            table += '<td data-sort-value="' + data[y] + '">' + time_interval(data[y]) + '</td>';
            break;
        case '2':
            table += '<td data-sort-value="' + data[y] + '">' + data[y] +
                     '<a href="#" onClick="add_client_filter(\'' + data[y] + '\')"><i class="fas fa-search"/></a></td>';
            break;
        case '3':
            table += '<td data-sort-value="' + data[y] + '" title="' + data[y] + '">' + shorten(data[y]) +
                     '<a href="#" onClick="add_hostname_filter(\'' + data[y] + '\')"><i class="fas fa-search"/></a>';
            if(data[4] == 'http' || data[4] == 'https') {
                let url=data[y];
                if(url.match(/:.*:/)) {
                    url = '[' + url + ']';
                }
                table += '<a href="' + data[4] + '://' + url + '" target="_blank_"><i class="fas fa-external-link-alt"/></a>';
            }
            table += '</td>';
            break;
        case '5':
            break;
        case '6':
        case '7':
            table += '<td data-sort-value="' + data[y] + '">' + format_data(data[y]) + '</td>';
            break;
        case '8':
            break;
        default:
            table += '<td data-sort-value="' + data[y] + '">' + data[y] + '</td>';
            break;
        }
    }
    return table;

}

function render_results() {
    console.log('Rendering data');
    if(filtered_data == null) {
        return {
            'table': '<tr><td></td><td colspan=7 id="no-data">No data</td></tr>',
            'word_list': '',
            'pager': '',
            'page_size': page_size,
            'sort_by': sort_by
        }
    }
    let table = '';
    let x = 0;
    let wordcloud = {};
    for(x = page * page_size;
        (x < filtered_data.length) && ((page_size == 0) || (x < (page + 1) * page_size)); x++) {
        table += '<tr id="line_' + x + '" class="' + (x % 2 ? 'odd' : 'even') + '">';
        if(filtered_data[x][8]) {
            table += '<td class="line-toogle" onClick="toogle_lines(' + x + ')"><i class="fas fa-plus"></i></td>';
        } else {
            table += '<td></td>';
        }
        table += render_entry(filtered_data[x]);
        table += '</tr>\n';
        if(filtered_data[x][8]) {
            let y = 0;
            for(y = 0; y < filtered_data[x][8].length; y++) {
                let extra_class = ' ';
                if(y == filtered_data[x][8].length - 1)
                    extra_class = ' extra_last ';
                table += '<tr class="extra_row extra_' + x + extra_class + (y % 2 ? 'odd' : 'even') + '"><td></td>' + render_entry(filtered_data[x][8][y]) + '</tr>\n';
            }
        }
    }
    var pager = '<ul>'
    if(page_size > 0) {
        let pages = filtered_data.length / page_size;
        if(pages * page_size < filtered_data.length)
            pages++;
        let dots = false;
        for(x = 0; x < pages; x++) {
            if(x < 4 || x > pages - 4 || Math.abs(x-page) < 3){
                if(x == page) {
                    pager += '<li class="current-page" onClick="goto_page(' + x + ')">' + x + '</li>';
                } else {
                    pager += '<li onClick="goto_page(' + x + ')"><a href="#">' + x + '</a></li>';
                }
                dots = false;
            } else if(!dots) {
                pager += '<li>...</li>';
                dots = true;
            }
        }
    }
    pager += '</ul>';
    return {
        'table': table,
        'pager': pager,
        'page_size': page_size,
        'sort_by': sort_by,
        'word_list': word_list_txt
    }
}

function print_date(date) {
    return '' + date.getFullYear() + '-' + zero_pad(date.getMonth() + 1) + '-' + zero_pad(date.getDate()) + ' ' + zero_pad(date.getHours()) + ':' + zero_pad(date.getMinutes()) + ':' + zero_pad(date.getSeconds());
}

function get_word_list() {
    word_list = {};
    if(filtered_data == null)
        return;
    let word_index = 3;
    let word_value_index = 1;
    for(x in filtered_data) {
        word_list[filtered_data[x][3]] = (word_list[filtered_data[x][3]] ? word_list[filtered_data[x][3]] : 0) + filtered_data[x][word_value_index];
    }
    word_list_txt = [];
    for(k in word_list) {
        word_list_txt.push({
            word: k,
            weight: word_list[k]
        });
    }
}

function aggregate_data() {
    console.log('Aggregating data');
    if((aggregate_by == 'none') || (filtered_data == null)) {
        aggregated_data = filtered_data;
        return
    }
    let index = 3;
    let other_index = 2;
    if(aggregate_by == 'hostname') {
        index = 3;
        other_index = 2;
    }
    if(aggregate_by == 'client') {
        index = 2;
        other_index = 3;
    }
    let tmp = filtered_data.sort(function (a, b) {
        if(a[index] == b[index]) {
            return a[other_index] < b[other_index]
        } else {
            return a[index] < b[index];
        }
    });
    console.log('Aggregating data (' + tmp.length + ')');
    aggregated_data = [];
    let cur_entry = ['', '', '', '', '', '', ''];
    let a_entries = [];
    let last_entry = cur_entry;
    let st_date;
    let nd_date;
    let tmp_date;
    let send;
    let recv;
    let i;
    let proto = ""
    aggregated_data = [];
    for(i = 0; i < tmp.length; i++) {
        cur_entry = tmp[i];
        if(cur_entry[2] == last_entry[2] && cur_entry[3] == last_entry[3]) {
            if(proto != cur_entry[4])
                proto = "";
            send += cur_entry[6];
            recv += cur_entry[7];
            tmp_date = new Date(Date.parse(cur_entry[0]));
            if(tmp_date < st_date) st_date = tmp_date;
            tmp_date = new Date(tmp_date.getTime() + cur_entry[1] * 1000);
            if(tmp_date > nd_date) nd_date = tmp_date;
            a_entries.push(cur_entry);
        } else {
            if(a_entries.length < 2) {
                if(a_entries.length == 1)
                    aggregated_data.push(a_entries[0]);
            } else {
                aggregated_data.push([print_date(st_date), (nd_date.getTime() - st_date.getTime()) / 1000, last_entry[2], last_entry[3], proto, '', send, recv, a_entries]);
            }
            send = cur_entry[6];
            recv = cur_entry[7];
            proto = cur_entry[4];
            a_entries = [cur_entry];
            st_date = new Date(Date.parse(cur_entry[0]));
            nd_date = new Date(st_date.getTime() + cur_entry[1] * 1000);
        }
        last_entry = cur_entry;
    }
    if(a_entries.length < 2) {
        if(a_entries.length == 1)
            aggregated_data.push(a_entries[0]);
    } else {
        aggregated_data.push([print_date(st_date), (nd_date.getTime() - st_date.getTime()) / 1000, last_entry[2], last_entry[3], proto, '', send, recv, a_entries]);
    }
    console.log('Aggregated ' + tmp.length + ' -> ' + aggregated_data.length);
    sort_data();
}

function sort_data() {
    console.log(`Sorting data by ${sort_by[0]} direction ${sort_by[1]}`);
    if(aggregated_data == null)
        return;
    if(sort_by[0] > 4) sort_by[0]++;
    filtered_data = aggregated_data.sort(function (a, b) {
        return sort_by[1] < 0 ? a[sort_by[0]] < b[sort_by[0]] : a[sort_by[0]] > b[sort_by[0]]
    });
    if(sort_by[0] > 4) sort_by[0]--;
}

function filter_data() {
    console.log('Filtering data');
    if(full_data == null) {
        filtered_data = null;
    } else {
        filtered_data = full_data.filter(function (e) {
            let ret = 0;
            if(filter_hosts.length > 0) {
                for(i in filter_hosts) {
                    if(filter_hosts[i].test(e[3])) {
                        ret |= 0x1;
                    }
                }
            } else {
                ret |= 0x1;
            }
            if(filter_clients.length > 0) {
                for(i in filter_clients) {
                    if(filter_clients[i].test(e[2])) {
                        ret |= 0x2;
                    }
                }
            } else {
                ret |= 0x2;
            }
            if(ret == 0x3) {
                return true;
            }
            return false;
        });
        console.log('Filtering done: ' + full_data.length + ' -> ' + filtered_data.length);
    }
    aggregate_data();
    get_word_list();
}

onmessage = function (e) {
    console.log('Message "' + e.data.command + '" received from main script');
    let render = false;
    switch (e.data.command) {
    case "change":
        page = 0;
        if(e.data.filter_hosts) {
            console.log("Updating host filters");
            filter_hosts = e.data.filter_hosts;
            console.log(filter_hosts);
        }
        if(e.data.filter_clients) {
            console.log("Updating client filters");
            filter_clients = e.data.filter_clients;
            console.log(filter_clients);
        }
        if(e.data.aggregate) {
            aggregate_by = 'hostname';
        } else {
            aggregate_by = 'none';
        }
        if(e.data.date_from || e.data.date_to) {
            full_data = [];
            console.log('Updating interval to ' + e.data.date_from + ' - ' + e.data.date_to);
            let req = new XMLHttpRequest();
            let query = '{"aggregate": false, "start":' + e.data.date_from + (e.data.date_to ? ',"end":' + e.data.date_to + '}' : '}');
            console.log('Getting response to ' + query);
            req.open('GET', e.data.ajax_url + '?action=perform_query&query=' + query, true);
            req.responseType = 'json';
            req.setRequestHeader('Content-type', 'application/json')
            req.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200) {
                    full_data = this.response;
                    filter_data();
                    postMessage(render_results());
                }
            };
            req.send();
        } else {
            filter_data();
            sort_data();
            postMessage(render_results());
        }
        break;
    case "page":
        page = e.data.page;
        page_size = e.data.page_size;
        postMessage(render_results());
        break;
    case "sort":
        page = 0;
        sort_by = e.data.sort_by;
        sort_data();
        postMessage(render_results());
        break;
    }
}
