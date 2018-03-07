
%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
    %include("_messages.tpl")

    <!--
    <form action="{{ url("config_action", page_name="pakon", action="perform_query") }}" class="config-form" method="post">
        <div class="row">
        <label for="field-lan_ipaddr">Router IP address</label>
        <input name="query" value="{{ query }}" type="text" id="field-query"/>
        <input type="hidden" name="csrf_token" value="{{ get_csrf_token() }}" id="csrf-token">
        </div>
        <div class="row">
        <button type="submit" name="action" id="pakon-query-trigger" value="query-trigger" class="button">{{ trans("Query") }}</button>
        </div>
    </form>
    -->

    <fieldset>
        <legend>{{ trans("Data view - settings") }}:</legend>
        <label for="date-from">
            {{ trans("Date From") }}:
            <input type="date" name="date-from" id="date-from">
        </label>
        <label for="time-from">
            {{ trans("Time") }}:
            <input type="time" name="time-from" id="time-from" title="{{ trans("Time From") }}">
        </label>
        <br>
        <label for="date-to">
            {{ trans("Date To") }}:
            <input type="date" name="date-to" id="date-to">
        </label>
        <label for="time-to">
            {{ trans("Time") }}:
            <input type="time" name="time-to" id="time-to" title="{{ trans("Time To") }}">
        </label>
        <hr>
        <label for="aggregate">
            {{ trans("Aggregation - by hostname") }}:
            <input type="checkbox" name="aggregate" id="aggregate" checked>
        </label>
        <hr>
        <label for="hostname-filter">
            {{ trans("Only following hostnames") }}:
            <br>
            <textarea name="hostname-filter" id="hostname-filter"></textarea>
            <br>
            <small>{{ trans("(All hostnames if empty)") }}</small>
        </label>
        <hr>
        <label for="srcMAC-filter">
            {{ trans("Only following MAC addresses") }}:
            <br>
            <textarea name="srcMAC-filter" id="srcMAC-filter"></textarea>
            <br>
            <small>{{ trans("(All MAC adresses if empty)") }}</small>
        </label>
        <hr>
        <label for="apply-changes">
            <input type="submit" id="apply-changes" value="aplikovat změny" disabled>
        </label>
    </fieldset>

    <h3>{{ trans("Statistics") }}</h3>
    <div id="pakon-results-statistics"></div>

    <h3>{{ trans("Results") }}</h3>
    %include("pakon/_results.tpl", results=results)
</div>

<script>
    const cntp = new czNicTurrisPakon(window);
    cntp.settings = {
        'eventSource': {
            'baseUrl': new URL('ajax', window.location.href),
            'dumpIntoStatistics': false,
        },
        'statisticsData': {
            'graphs': {
                'type': 'doughnut',
            },
        },
        'lang': '{{ lang() }}',
    };
    cntp.run();
    const cs = window.document.currentScript;
    cs.parentNode.removeChild(cs);
</script>
