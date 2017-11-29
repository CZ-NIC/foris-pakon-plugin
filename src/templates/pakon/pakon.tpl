
%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
%include("_messages.tpl")

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
<h3>{{ trans("Results") }}</h3>
%include("pakon/_results.tpl", results=results)
</div>
