# Foris pakon plugin
# Copyright (C) 2017 CZ.NIC, z. s. p. o. <https://www.nic.cz>
#
# Foris is distributed under the terms of GNU General Public License v3.
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

import bottle
import json
import os

from foris import fapi
from foris.config import ConfigPageMixin, add_config_page
from foris.config_handlers import BaseConfigHandler
from foris.plugins import ForisPlugin
from foris.state import current_state
from foris.utils.translators import gettext_dummy as gettext, ugettext as _


class PakonPluginConfigHandler(BaseConfigHandler):
    userfriendly_title = gettext("pakon")

    def get_form(self):
        form = fapi.ForisForm("pakon", {})
        form.add_section(name="pakon", title=_(self.userfriendly_title))

        return form


class PakonPluginPage(ConfigPageMixin, PakonPluginConfigHandler):
    menu_order = 81
    template = "pakon/pakon.tpl"
    userfriendly_title = gettext("Pakon")

    def save(self, *args, **kwargs):
        kwargs['no_messages'] = True  # disable default messages
        return super(PakonPluginPage, self).save(*args, **kwargs)

    def _prepare_render_args(self, args):
        args['PLUGIN_NAME'] = PakonPlugin.PLUGIN_NAME
        args['PLUGIN_STYLES'] = PakonPlugin.PLUGIN_STYLES
        args['PLUGIN_STATIC_SCRIPTS'] = PakonPlugin.PLUGIN_STATIC_SCRIPTS
        args['PLUGIN_DYNAMIC_SCRIPTS'] = PakonPlugin.PLUGIN_DYNAMIC_SCRIPTS
        args['query'] = json.dumps({})
        data = current_state.backend.perform(
            "pakon", "perform_query", {"query_data": args['query']})
        args['results'] = self._prepare_data(data)

    def render(self, **kwargs):
        self._prepare_render_args(kwargs)
        return super(PakonPluginPage, self).render(**kwargs)


    def _prepare_data(self, data):
        return json.loads(data["response_data"])


    def call_ajax_action(self, action):
        if action == "eventsource":
            if bottle.request.method != 'GET':
                raise bottle.HTTPError(405, "Wrong http method (only GET is allowed).")
            query_data = bottle.request.GET.get('query', {})
            data = current_state.backend.perform("pakon", "perform_query", {"query_data": query_data})
            bottle.response.set_header("Content-Type", "text/event-stream")
            bottle.response.set_header("Cache-Control", "no-cache")
            return bottle.template(
                "pakon/eventsource",
                results=self._prepare_data(data),
            )

        elif action == "perform_query":
            if bottle.request.method != 'POST':
                raise bottle.HTTPError(405, "Wrong http method (only POST is allowed).")

            query_data = bottle.request.POST.get('query', {})
            data = current_state.backend.perform("pakon", "perform_query", {"query_data": query_data})
            if "text/html" in bottle.request.headers["Accept"]:
                return bottle.template(
                    "pakon/_results",
                    results=self._prepare_data(data),
                )
            else:
                bottle.response.content_type = "application/json"
                return data["response_data"]

        raise ValueError("Unknown AJAX action.")


class PakonPlugin(ForisPlugin):
    PLUGIN_NAME = "pakon"
    DIRNAME = os.path.dirname(os.path.abspath(__file__))

    PLUGIN_STYLES = [
        "css/pakon.css"
    ]
    PLUGIN_STATIC_SCRIPTS = [
    ]
    PLUGIN_DYNAMIC_SCRIPTS = [
        "pakon.js"
    ]

    def __init__(self, app):
        super(PakonPlugin, self).__init__(app)
        add_config_page("pakon", PakonPluginPage, top_level=True)
