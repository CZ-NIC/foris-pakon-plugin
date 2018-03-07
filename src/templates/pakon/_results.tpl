<div id="pakon-results">
    %if reversed(results):
    <table id="pakon-results-table">
        <thead>
            <tr>
                <th>čas</th>
                <th>port</th>
                <th>lokální zařízení</th>
                <th>vzdálená služba</th>
                <th>protokol</th>
                <th>f</th>
                <th>g</th>
                <th>h</th>
            </tr>
        </thead>
        <tbody>
            %for record in results:
            <tr>
                %for item in record:
                <td>{{ item }}</td>
                %end
            </tr>
            %end
        </tbody>
    </table>

    %else:
    <p>{{ trans("No results found.") }}</p>
    %end
</div>
