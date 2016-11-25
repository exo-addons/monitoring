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
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * Created by ngammoudi on 8/26/16.
 */


public class MonitoringController {

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
    @Path("portlets.gtmpl")
    Template portlets;

    @Inject
    @Path("templates.gtmpl")
    Template templates;

    @Inject
    @Path("applications.gtmpl")
    Template applications;

    @Inject
    @Path("memory.gtmpl")
    Template memory;

    @Inject
    ResourceBundle bundle;
    @View
    public Response.Content index() throws  Exception{
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("monitoringPortlet", bundle.getString("monitoring.portlet.title"));
        parameters.put("queriesLabel", bundle.getString("queries.label"));
        parameters.put("collectionsLabel", bundle.getString("collections.label"));
        parameters.put("entitiesLabel", bundle.getString("entities.label"));
        parameters.put("cachesLabel", bundle.getString("caches.label"));
        parameters.put("portletsLabel", bundle.getString("portlets.label"));
        parameters.put("templatesLabel", bundle.getString("templates.label"));
        parameters.put("applicationsLabel", bundle.getString("application.label"));
        parameters.put("memoryLabel", bundle.getString("memory.label"));
        parameters.put("queryLabel", bundle.getString("query.label"));
        parameters.put("performanceLabel", bundle.getString("performance.label"));
        parameters.put("dbTimeLabel", bundle.getString("timeDB.label"));
        parameters.put("invocationsLabel", bundle.getString("invocations.label"));
        parameters.put("rowsLabel", bundle.getString("rowsFetched.label"));
        parameters.put("collectionLabel", bundle.getString("collection.label"));
        parameters.put("accessCountLabel", bundle.getString("accessCount.label"));
        parameters.put("loadsLabel", bundle.getString("loads.label"));
        parameters.put("fetchesLabel", bundle.getString("fetches.label"));
        parameters.put("recreationsLabel", bundle.getString("recreations.label"));
        parameters.put("modificationsLabel", bundle.getString("modifications.label"));
        parameters.put("entityLabel", bundle.getString("entity.label"));
        parameters.put("optimisticLabel", bundle.getString("optimistic.label"));
        parameters.put("cacheLabel", bundle.getString("cache.label"));
        parameters.put("hitCountLabel", bundle.getString("hitCount.label"));
        parameters.put("missCountLabel", bundle.getString("missCount.label"));
        parameters.put("hitRationLabel", bundle.getString("hitRation.label"));
        parameters.put("missRatioLabel", bundle.getString("missRatio.label"));
        parameters.put("capacityLabel", bundle.getString("capacity.label"));
        parameters.put("sizeLabel", bundle.getString("size.label"));
        parameters.put("timeToLiveLabel", bundle.getString("timeToLive.label"));
        parameters.put("portletLabel", bundle.getString("portlet.label"));
        parameters.put("phaseLabel", bundle.getString("phase.label"));
        parameters.put("maxTimeLabel", bundle.getString("maxTime.label"));
        parameters.put("minTimeLabel", bundle.getString("minTime.label"));
        parameters.put("avgTimeLabel", bundle.getString("avgTime.label"));
        parameters.put("executionCountLabel", bundle.getString("executionCount.label"));
        parameters.put("templateLabel", bundle.getString("template.label"));


        return index.ok(parameters);


    }

}
