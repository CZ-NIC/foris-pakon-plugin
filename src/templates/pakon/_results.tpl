<div id="pakon-results">
    %if reversed(results):
    <table id="pakon-results-table"></table>

    %else:
    <p>{{ trans("No results found.") }}</p>
    %end
</div>
