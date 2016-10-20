package org.exoplatform.addon.statistics.services;

import org.exoplatform.addon.statistics.util.StatisticsUtils;
import org.exoplatform.container.PortalContainer;
import org.exoplatform.services.rest.resource.ResourceContainer;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.stat.CollectionStatistics;
import org.hibernate.stat.EntityStatistics;
import org.hibernate.stat.QueryStatistics;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.management.MBeanAttributeInfo;
import javax.management.MBeanInfo;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.management.ManagementFactory;
import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.Set;

/**
 * Created by ngammoudi on 10/14/16.
 */
@Path("/cacheservice")
public class CacheRestService implements ResourceContainer {

    /**
     * Rest service to load alll queries statistics
     * @return
     * @throws Exception
     */
    @GET
    @Path("queriesstatistics")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadQueriesStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor hibernateStatistics = hibernateStatisticsService.generateStatistics();
        JSONArray jsonQueries = new JSONArray();
        JSONObject jsonQueriesGlobal = new JSONObject();
        String [] queries = hibernateStatistics.getStatistics().getQueries();
        try {

            for (String query : queries) {
                JSONObject jsonObject = new JSONObject();
                QueryStatistics queryStatistics = hibernateStatistics.getStatistics().getQueryStatistics(query);
                double maxQueryPerformance = Math.max(0, StatisticsUtils.toQueryPerformance(queryStatistics));
                if (queryStatistics.getCachePutCount() == 0 && queryStatistics.getCacheHitCount() == 0)
                    jsonObject.put("Cached","n/a");
                else
                {
                    jsonObject.put("Cached",Math.round((StatisticsUtils.toRatio(queryStatistics.getCacheHitCount(), queryStatistics.getCacheMissCount())*100D)* 1000D) / 1000D);
                }
                jsonObject.put("Performance",StatisticsUtils.performanceTableCell(maxQueryPerformance,StatisticsUtils.toQueryPerformance(queryStatistics))+" %");
                jsonObject.put("DBTime",new DecimalFormat("0.###").format(StatisticsUtils.toTotalAverageTime(queryStatistics) / 1000D) + " s");
                jsonObject.put("Invocations", queryStatistics.getExecutionCount() + queryStatistics.getCacheHitCount());
                jsonObject.put("RowsFetched", queryStatistics.getExecutionRowCount());
                jsonObject.put("query" , query);
                jsonQueries.put(jsonObject);

            }

            jsonQueriesGlobal.put("data",jsonQueries);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return Response.ok(jsonQueriesGlobal.toString(), MediaType.APPLICATION_JSON).build();
    }

    /**
     * Rest service to load all entities statistics.
     * @return
     * @throws Exception
     */
    @GET
    @Path("entitiesstatistics")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadEntitiesStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor hibernateStatistics = hibernateStatisticsService.generateStatistics();
        JSONArray jsonEntities = new JSONArray();
        JSONObject jsonEntitiesGlobal = new JSONObject();
        String[] entitiesStatistics = hibernateStatistics.getStatistics().getEntityNames();
        try {

            for (String entity : entitiesStatistics) {
                JSONObject jsonObject = new JSONObject();
                EntityStatistics entityStatistics = hibernateStatistics.getStatistics().getEntityStatistics(entity);
                Long cacheHits=hibernateStatistics.getStatistics().getSecondLevelCacheHitCount();
                if (entityStatistics.getLoadCount()+cacheHits == 0)
                    jsonObject.put("EntityPerformance","n/a");
                else if (entityStatistics.getLoadCount() + entityStatistics.getFetchCount() + cacheHits==0){
                    jsonObject.put("EntityPerformance",0);
                }
                else{
                    jsonObject.put("EntityPerformance",(Math.max(0, (entityStatistics.getLoadCount() + cacheHits) - (entityStatistics.getDeleteCount() + entityStatistics.getInsertCount() + entityStatistics.getUpdateCount())))/entityStatistics.getLoadCount() + entityStatistics.getFetchCount() + cacheHits);
                }
                jsonObject.put("EntityAccessCount", entityStatistics.getFetchCount()+entityStatistics.getLoadCount()+cacheHits);
                jsonObject.put("EntityLoadsCount", entityStatistics.getLoadCount());
                jsonObject.put("EntityFetchesCount", entityStatistics.getFetchCount());
                jsonObject.put("EntityOptimisticFailureCount", entityStatistics.getOptimisticFailureCount());
                jsonObject.put("EntityModificationCount", entityStatistics.getInsertCount()+entityStatistics.getUpdateCount()+entityStatistics.getDeleteCount());
                jsonObject.put("entity" , entity);
                jsonEntities.put(jsonObject);

            }

            jsonEntitiesGlobal.put("data",jsonEntities);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return Response.ok(jsonEntitiesGlobal.toString(), MediaType.APPLICATION_JSON).build();
    }

    /**
     * Rest service to load collections statistics
     * @return
     * @throws Exception
     */
    @GET
    @Path("collectionsstatistics")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadCollectionsStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor hibernateStatistics = hibernateStatisticsService.generateStatistics();
        JSONArray jsonCollections = new JSONArray();
        JSONObject jsonCollectionsGlobal = new JSONObject();
        String [] collectionsStatistics = hibernateStatistics.getStatistics().getCollectionRoleNames();
        try {

            for (String collection : collectionsStatistics) {
                JSONObject jsonObject = new JSONObject();
                CollectionStatistics collectionStatistics = hibernateStatistics.getStatistics().getCollectionStatistics(collection);
                Long cacheHits=hibernateStatistics.getStatistics().getSecondLevelCacheHitCount();
                if (collectionStatistics.getLoadCount() + cacheHits == 0)
                    jsonObject.put("CollectionPerformance","n/a");
                else if (collectionStatistics.getLoadCount() + collectionStatistics.getFetchCount() + cacheHits==0){
                    jsonObject.put("CollectionPerformance",0);
                }
                else{
                    jsonObject.put("CollectionPerformance",(Math.max(0, (collectionStatistics.getLoadCount() + cacheHits) - (collectionStatistics.getRemoveCount() + collectionStatistics.getRecreateCount() + collectionStatistics.getUpdateCount())))/collectionStatistics.getLoadCount() + collectionStatistics.getFetchCount() + cacheHits);
                }
                jsonObject.put("CollectionAccessCount", collectionStatistics.getFetchCount()+collectionStatistics.getLoadCount()+cacheHits);
                jsonObject.put("CollectionLoadsCount", collectionStatistics.getLoadCount());
                jsonObject.put("CollectionFetchesCount", collectionStatistics.getFetchCount());
                jsonObject.put("CollectionRecreationCount", collectionStatistics.getRecreateCount());
                jsonObject.put("CollectionModificationCount", collectionStatistics.getRecreateCount()+collectionStatistics.getUpdateCount()+collectionStatistics.getRemoveCount());
                jsonObject.put("collection" , collection);
                jsonCollections.put(jsonObject);
            }
            jsonCollectionsGlobal.put("data",jsonCollections);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return Response.ok(jsonCollectionsGlobal.toString(), MediaType.APPLICATION_JSON).build();
    }
    /**
     * Rest service to load all exo cache statistics
     * @return
     * @throws Exception
     */
    @GET
    @Path("cachestatistics")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadCacheStatistics() throws Exception {
        JSONArray jsonCaches = new JSONArray();
        JSONObject jsonCachesGlobal = new JSONObject();
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        ObjectName ObjectName = new ObjectName("exo:*");
        Set<javax.management.ObjectName> allNames = mBeanServer.queryNames(ObjectName, null);
        Iterator it = allNames.iterator();
        while (it.hasNext()) {
            javax.management.ObjectName obj = (javax.management.ObjectName) it.next();
            if (obj.getCanonicalName().contains("service=cache") && !(obj.getCanonicalName().contains("WebNotificationsCache"))) {

                try {
                    JSONObject jsonObject = new JSONObject();
                    MBeanInfo mBeanInfo = mBeanServer.getMBeanInfo(obj);
                    MBeanAttributeInfo[] mBeanAttributeInfos = mBeanInfo.getAttributes();
                    for (MBeanAttributeInfo mBeanAttributeInfo : mBeanAttributeInfos) {
                        if(mBeanAttributeInfo.getName()!=null){
                            jsonObject.put(mBeanAttributeInfo.getName(), mBeanServer.getAttribute(obj, mBeanAttributeInfo.getName()));
                        }

                    }
                    if(jsonObject.length()!=0){
                        jsonCaches.put(jsonObject);
                    }

                    jsonCachesGlobal.put("data",jsonCaches) ;
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
        }
        return Response.ok(jsonCachesGlobal.toString(), MediaType.APPLICATION_JSON).build();
    }


}