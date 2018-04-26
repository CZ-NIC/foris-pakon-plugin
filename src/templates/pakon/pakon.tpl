%rebase("config/base.tpl", **locals())

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous"><!--@todo : download for local offline usage -->

<div id="page-pakon-plugin" class="config-page">
    %include("_messages.tpl")

    <fieldset>
        <legend><h3>{{ trans("Filtering") }}:</h3></legend>
        <label for="date-from" title="{{ trans("Date From") }}">
            <span>{{ trans("From") }}:</span>
            <input type="date" name="date-from" id="date-from">
        </label>
        <label for="time-from" title="{{ trans("Time From") }}">
            <span>{{ trans("Time") }}:</span>
            <input type="time" name="time-from" id="time-from">
        </label>
        <br>
        <label for="date-to" title="{{ trans("Date To") }}">
            <span>{{ trans("To") }}:</span>
            <input type="date" name="date-to" id="date-to">
        </label>
        <label for="time-to" title="{{ trans("Time To") }}">
            <span>{{ trans("Time") }}:</span>
            <input type="time" name="time-to" id="time-to">
        </label>
        <br>
        <br>
        <label for="aggregate">
            {{ trans("Aggregation by hostname") }}:
            <input type="checkbox" name="aggregate" id="aggregate" checked>
        </label>
        <br>
        <br>
        <label for="hostname-filter">
            {{ trans("Only following hostnames") }}:
            <br>
            <textarea name="hostname-filter" id="hostname-filter" placeholder="{{ trans("All hostnames if empty") }}"></textarea>
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

<script src="{{ static("plugins/pakon/js/Chart.min.js") }}"></script>
<script src="{{ static("plugins/pakon/js/czNicTurrisPakon.js") }}"></script>
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
