
%rebase("config/base.tpl", **locals())

<div id="page-pakon-plugin" class="config-page">
    %include("_messages.tpl")

    <aside>
        <ul>
            <li><b>Průběžně aktualizované, ale zatím nezařazené ukazatele:</b></li>
            <li id="n-items">Počet záznamů v databázi: <span>0</span></li>
            <li id="n-macs">Počet unikátních mac adres: <span>0</span></li>
            <li id="most-used-remote-services">Počet unikátních mac adres:
                <ol>
                    <li></li>
                </ol>
            </li>
        </ul>
    </aside>

    <form action="{{ url("config_action", page_name="pakon", action="perform_query") }}" class="config-form" method="get">
        <div class="row">
            <label for="field-lan_ipaddr">Router IP address</label>
            <input type="text" name="query" value="{{ query }}" id="field-query">
            <input type="hidden" name="csrf_token" value="{{ get_csrf_token() }}" id="csrf-token">
        </div>
        <div class="row">
            <button type="submit" name="action" id="pakon-query-trigger" value="query-trigger" class="button">
                {{ trans("Query") }}
            </button>
        </div>
    </form>

    <h3>{{ trans("Results") }}</h3>
    %include("pakon/_results.tpl", results=results)
</div>
