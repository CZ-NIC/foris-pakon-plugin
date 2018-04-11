%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
    %include("_messages.tpl")

    <fieldset>
        <legend>{{ trans("Filtering") }}:</legend>
        <label for="date-from" title="{{ trans("Date From") }}">
            {{ trans("From") }}:
            <input type="date" name="date-from" id="date-from">
        </label>
        <label for="time-from" title="{{ trans("Time From") }}">
            {{ trans("Time") }}:
            <input type="time" name="time-from" id="time-from">
        </label>
        <br>
        <label for="date-to" title="{{ trans("Date To") }}">
            {{ trans("Date To") }}:
            <input type="date" name="date-to" id="date-to">
        </label>
        <label for="time-to" title="{{ trans("Time To") }}">
            {{ trans("Time") }}:
            <input type="time" name="time-to" id="time-to">
        </label>
        <br>
        <label for="aggregate">
            {{ trans("Aggregation by hostname") }}:
            <input type="checkbox" name="aggregate" id="aggregate" checked>
        </label>
        <br>
        <label for="hostname-filter">
            {{ trans("Only following hostnames") }}:
            <br>
            <textarea name="hostname-filter" id="hostname-filter" placeholder="{{ trans("All hostnames if empty") }}"></textarea>
            <br>
            <small>{{ trans("(All hostnames if empty)") }}</small>
        </label>
        <br>
        <label for="srcMAC-filter">
            {{ trans("Only following clients") }}:
            <br>
            <textarea name="srcMAC-filter" id="srcMAC-filter" placeholder="{{ trans("All clients if empty") }}"></textarea>
        </label>
        <br>
        <label for="apply-changes">
            <input type="submit" id="apply-changes" value="{{ trans("Apply changes") }}" disabled>
        </label>
    </fieldset>

    <h3>{{ trans("Statistics") }}</h3>
    <div id="pakon-results-statistics"></div>

    <h3>{{ trans("Results") }}</h3>
    %include("pakon/_results.tpl")
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
