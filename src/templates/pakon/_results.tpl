<div id="pakon-results">
%if results:
<table id="pakon-results-table">
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
