
%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
%include("_messages.tpl")

<div id="filter-form">
<div id="spinner"></div>
<fieldset>
    <legend>
        <h3>{{ trans("Filtering:") }}</h3>
    </legend>
    <label for="date-from" title="Date From">
        <span>{{ trans("From:") }}</span>
        <input name="time-from" id="time-from" type="time" onChange="date_changed=true;">
        <input name="date-from" id="date-from" type="date" onChange="date_changed=true;">
    </label>
    <label for="date-to" title="Date To">
        <span>{{ trans("To:") }}</span>
        <input name="time-to" id="time-to" type="time" onChange="date_changed=true;">
        <input name="date-to" id="date-to" type="date" onChange="date_changed=true;">
    </label>
    <label for="aggregate" tabindex="0" class="checkbox">
        {{ trans("Aggregation by hostname:") }}
        <input name="aggregate" id="aggregate" tabindex="-1" checked="" style="pointer-events: none;" type="checkbox">
    </label>
    <label for="hostname-filter">
        {{ trans("Only following hostnames:") }}
        <br>
        <textarea name="hostname-filter" id="hostname-filter" placeholder="All hostnames if empty" onChange="filter_changed=true;"></textarea>
    </label>
    <label for="srcMAC-filter">
        {{ trans("Only following clients:") }}
        <br>
        <textarea name="client-filter" id="client-filter" placeholder="All clients if empty" onChange="filter_changed=true;"></textarea>
    </label>
    <label for="apply-changes">
        <input id="apply-changes" class="button" onClick="apply()" value="Apply changes" type="submit">
    </label>
</fieldset>
</div>

    <h3>{{ trans("Overview") }}</h3>
<div id="tagcloud"></div>

    <h3>{{ trans("Results") }}</h3>
<div id="pakon-results">
    <table id="pakon-results-table">
    <thead><tr>
       <th></th>
       <th class="sortable"><i></i>Date</th>
       <th class="sortable"><i></i>Duration</th>
       <th class="sortable"><i></i>Client</th>
       <th class="sortable"><i></i>Hostname</th>
       <th class="sortable"><i></i>Port</th>
       <th class="sortable"><i></i>Sent</th>
       <th class="sortable"><i></i>Received</th>
    </tr></thead><tbody id="pakon-table-data">
    </table>
    <div id="pakon-pager">
      <p id="pakon-pager-page"></p>
      <select id="pakon-pager-pagesize" onChange="dnd(); page_size = this.value; wrk.postMessage({'command': 'page', 'page_size': this.value, 'page': 0});">
        <option value="50">50 per page</option>
        <option value="100">100 per page</option>
        <option value="200">200 per page</option>
        <option value="500">500 per page</option>
        <option value="0">everything</option>
      </select>
    </div>
</div>
</div>
