%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
    %include("_messages.tpl")

    <fieldset>
        <legend>
            <h3>{{ trans("Filtering") }}:</h3>
        </legend>
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
        <label for="aggregate" tabindex="0" class="checkbox">
            {{ trans("Aggregation by hostname") }}:
            <input type="checkbox" name="aggregate" id="aggregate" tabindex="-1" checked>
        </label>
        <br>
        <br>
        <label for="hostname-filter">
            {{ trans("Only following hostnames") }}:
            <br>
            <textarea name="hostname-filter" id="hostname-filter" placeholder="{{ trans("All hostnames if empty") }}" class="tags"></textarea>
        </label>
        <br>
        <label for="srcMAC-filter">
            {{ trans("Only following clients") }}:
            <br>
            <textarea name="srcMAC-filter" id="srcMAC-filter" placeholder="{{ trans("All clients if empty") }}" class="tags"></textarea>
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


<script src="{{ static("plugins/pakon/js/focuserForLabels.defer.js") }}?v=2" defer></script>
<script src="{{ static("plugins/pakon/js/tagsBuilder.defer.js") }}?v=2" defer></script>
<script src="{{ static("plugins/pakon/js/sortableTable.defer.js") }}?v=2" defer></script>
<script src="{{ static("plugins/pakon/js/timeLiveView.defer.js") }}?v=2" defer></script>

<script src="{{ static("plugins/pakon/js/Chart.min.js") }}"></script>
<script src="{{ static("plugins/pakon/js/czNicTurrisPakon.js") }}?v=3"></script>
<script>
    const cntp = new czNicTurrisPakon( window );
    cntp.settings = {
        'eventSource': {
            'baseUrl': new URL( 'ajax', window.location.href ),
            'dumpIntoStatistics': false,
        },
        'postRenderImprove': {
            'brandColorsUrl': new URL( '/static/js/brandcolors.json', window.location.href ),
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
    cs.parentNode.removeChild( cs );
    /////////////////////
    window.lang = '{{ lang() }}';
</script>
