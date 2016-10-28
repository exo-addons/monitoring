@Portlet
@Application(name = "Monitoring")
@Bindings({@Binding(HibernateStatisticsService.class)})

@Scripts({
       @Script(id = "jquery", value = "js/jquery/jquery-1.12.3.js"),
        @Script(id = "datatables", value = "js/datatable/jquery.dataTables.js",depends = "jquery"),
        @Script(id = "datatables-buttons", value = "js/datatable/dataTables.buttons.js",depends={"jquery","datatables"}),
        @Script(id = "highchart-js", value = "js/graphs/highcharts.js",depends = "jquery"),
        @Script(id = "exporting-js", value = "js/graphs/exporting.js",depends = "highchart-js"),
        @Script(id = "canvas-js", value = "js/graphs/canvasjs.min.js",depends = "jquery"),
        @Script(id = "hibernate-statistics-js", value = "js/monitoring/monitoring.js",depends ={"datatables-buttons","highchart-js","exporting-js","canvas-js"})
})

@Stylesheets({

        @Stylesheet(id = "jquery-datatable-css", value = "css/datatable/jquery.dataTables.css"),
        @Stylesheet(id = "buttons-datatables-css", value = "css/datatable/buttons.dataTables.css"),
        @Stylesheet(id = "hibernate-statistics-css", value = "css/monitoring/monitoring.css")})
@Assets("*")
package org.exoplatform.addon.statistics.portlet;

import juzu.Application;
import juzu.plugin.asset.Assets;
import juzu.plugin.asset.Script;
import juzu.plugin.asset.Scripts;
import juzu.plugin.asset.Stylesheet;
import juzu.plugin.asset.Stylesheets;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
import juzu.plugin.portlet.Portlet;
import org.exoplatform.addon.statistics.services.HibernateStatisticsService;