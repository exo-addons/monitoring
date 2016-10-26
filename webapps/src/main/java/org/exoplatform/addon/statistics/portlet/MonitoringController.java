package org.exoplatform.addon.statistics.portlet;

import juzu.Path;
import juzu.Response;
import juzu.View;
import juzu.template.Template;
import org.exoplatform.addon.statistics.services.StatisticsRestService;
import org.exoplatform.addon.statistics.services.HibernateStatisticsService;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.hibernate.jmx.StatisticsService;

import javax.inject.Inject;

/**
 * Created by ngammoudi on 8/26/16.
 */


public class MonitoringController {
    private static final Log LOGGER = ExoLogger.getLogger(MonitoringController.class);
    @Inject
    HibernateStatisticsService hibernateStatisticsService;
    @Inject
    StatisticsRestService statisticsRestService;
    @Inject
    StatisticsService statisticsService;
    @Inject
    @Path("index.gtmpl")
    Template index;
    @Inject
    @Path("queries.gtmpl")
    Template queries;

    @Inject
    @Path("entities.gtmpl")
    Template entities;

    @Inject
    @Path("collections.gtmpl")
    Template collections;

    @Inject
    @Path("cache.gtmpl")
    Template cache;

    @Inject
    @Path("applications.gtmpl")
    Template applications;

    @Inject
    @Path("templates.gtmpl")
    Template templates;

    @View
    public Response.Content index() throws  Exception{

        return index.with().ok();


    }

}
