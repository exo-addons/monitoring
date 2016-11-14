package org.exoplatform.addon.statistics.services;

import com.sun.management.OperatingSystemMXBean;
import org.exoplatform.addon.statistics.services.impl.StatisticsDataStorageImpl;
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
import java.util.Date;
import java.util.Iterator;
import java.util.Set;

/**
 * Created by ngammoudi on 10/14/16.
 */
@Path("/exo-statistics")
public class StatisticsRestService implements ResourceContainer {

    /**
     * Rest service to load all queries statistics
     * @return
     * @throws Exception
     */
    @GET
    @Path("queries")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadQueriesStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor sessionFactory = hibernateStatisticsService.getSessionFactory();
        JSONArray jsonQueries = new JSONArray();
        JSONObject jsonQueriesGlobal = new JSONObject();
        String [] queries = sessionFactory.getStatistics().getQueries();
        double maxQueryPerformance=0;

        maxQueryPerformance = getMaxQueryPerformance(sessionFactory, queries, maxQueryPerformance);
        try {

            for (String query : queries) {
                JSONObject jsonObject = new JSONObject();
                QueryStatistics queryStatistics = sessionFactory.getStatistics().getQueryStatistics(query);

                jsonObject.put("Performance",new DecimalFormat("0.##").format(100*StatisticsUtils.performanceTableCell(maxQueryPerformance, Math.max(0D, maxQueryPerformance - StatisticsUtils.toQueryPerformance(queryStatistics))))+" %");
                jsonObject.put("DBTime",StatisticsUtils.toTotalAverageTime(queryStatistics)==0?"0.000 s":new DecimalFormat("0.###").format(StatisticsUtils.toTotalAverageTime(queryStatistics) / 1000D) + " s");
                jsonObject.put("Invocations", queryStatistics.getExecutionCount());
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
    @Path("entities")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadEntitiesStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor hibernateStatistics = hibernateStatisticsService.getSessionFactory();
        JSONArray jsonEntities = new JSONArray();
        JSONObject jsonEntitiesGlobal = new JSONObject();
        String[] entitiesStatistics = hibernateStatistics.getStatistics().getEntityNames();
        try {

            for (String entity : entitiesStatistics) {
                JSONObject jsonObject = new JSONObject();
                EntityStatistics entityStatistics = hibernateStatistics.getStatistics().getEntityStatistics(entity);
                double totalLoaded=entityStatistics.getLoadCount() + entityStatistics.getFetchCount();
                double fastLoads=Math.max(0, (entityStatistics.getLoadCount()) - (entityStatistics.getDeleteCount() + entityStatistics.getInsertCount() + entityStatistics.getUpdateCount()));
                if (entityStatistics.getLoadCount()== 0)
                    jsonObject.put("EntityPerformance","n/a");
                else if (totalLoaded ==0){
                    jsonObject.put("EntityPerformance",0);
                }
                else{

                    jsonObject.put("EntityPerformance",new DecimalFormat("0.##").format((fastLoads/totalLoaded)*100)+" %");
                }
                jsonObject.put("EntityAccessCount", entityStatistics.getFetchCount()+entityStatistics.getLoadCount());
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
    @Path("collections")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadCollectionsStatistics()  throws  Exception{
        HibernateStatisticsService hibernateStatisticsService=PortalContainer.getInstance().getComponentInstanceOfType(HibernateStatisticsService.class);
        SessionFactoryImplementor hibernateStatistics = hibernateStatisticsService.getSessionFactory();
        JSONArray jsonCollections = new JSONArray();
        JSONObject jsonCollectionsGlobal = new JSONObject();
        String [] collectionsStatistics = hibernateStatistics.getStatistics().getCollectionRoleNames();
        try {

            for (String collection : collectionsStatistics) {
                JSONObject jsonObject = new JSONObject();
                CollectionStatistics collectionStatistics = hibernateStatistics.getStatistics().getCollectionStatistics(collection);
                double totalLoaded=collectionStatistics.getLoadCount() + collectionStatistics.getFetchCount();
                double fastLoads=Math.max(0, (collectionStatistics.getLoadCount()) - (collectionStatistics.getRemoveCount() + collectionStatistics.getRecreateCount() + collectionStatistics.getUpdateCount()));
                if (collectionStatistics.getLoadCount()  == 0)
                    jsonObject.put("CollectionPerformance","n/a");
                else if (totalLoaded ==0){
                    jsonObject.put("CollectionPerformance",0);
                }
                else{
                    jsonObject.put("CollectionPerformance",new DecimalFormat("0.##").format((fastLoads/totalLoaded)*100)+" %");
                }
                jsonObject.put("CollectionAccessCount", collectionStatistics.getFetchCount()+collectionStatistics.getLoadCount());
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
    @Path("caches")
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

    /**
     * Return maxQueryPerformance
     * @param sessionFactory
     * @param queries
     * @param maxQueryPerformance
     * @return
     */
    private double getMaxQueryPerformance(SessionFactoryImplementor sessionFactory, String[] queries, double maxQueryPerformance) {
        for (String query : queries) {
            QueryStatistics queryStatistics = sessionFactory.getStatistics().getQueryStatistics(query);
            maxQueryPerformance = Math.max(maxQueryPerformance, StatisticsUtils.toQueryPerformance(queryStatistics));
        }
        return maxQueryPerformance;
    }

    /**
     * Rest service to load all social and wiki data statistics
     * @return
     * @throws Exception
     */
    @GET
    @Path("applicationdata")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadSocialStatistics()  throws  Exception{
        StatisticsDataStorageImpl statisticsDataStorage=PortalContainer.getInstance().getComponentInstanceOfType(StatisticsDataStorageImpl.class);
        JSONObject jsonObject = new JSONObject();
        try {

                long identitiesCount=statisticsDataStorage.getIdentitiesCount();
                long spacesCount=statisticsDataStorage.getSpacesCount();
                long activitiesCount=statisticsDataStorage.getActivitiesCount();
                long connectionsCount=statisticsDataStorage.getConnectionsCount();
                long spaceMemberCount=statisticsDataStorage.getSpaceMemberCount();
                long pagesCount=statisticsDataStorage.getPagesCount();
                long templatesCount=statisticsDataStorage.getTemplatesCount();
                long attachmentCount=statisticsDataStorage.getPageAttachmentCount();
                jsonObject.put("identitiesCount", identitiesCount);
                jsonObject.put("spacesCount", spacesCount);
                jsonObject.put("activitiesCount", activitiesCount);
                jsonObject.put("connectionsCount", connectionsCount);
                jsonObject.put("spaceMemberCount", spaceMemberCount);
                jsonObject.put("pagesCount", pagesCount);
                jsonObject.put("templatesCount", templatesCount);
                jsonObject.put("attachmentCount", attachmentCount);


        } catch (JSONException e) {
            e.printStackTrace();
        }
        return Response.ok(jsonObject.toString(), MediaType.APPLICATION_JSON).build();
    }
    @GET
    @Path("cpu")
    @Produces({MediaType.APPLICATION_JSON})
    public Response loadCPUStatistics() throws Exception {
        JSONObject jsonObject = new JSONObject();
        OperatingSystemMXBean osBean = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);
        try {

            jsonObject.put("currentDate", System.currentTimeMillis() );
            jsonObject.put("processCPU", osBean.getProcessCpuLoad() * 100);


        } catch (JSONException e) {
            e.printStackTrace();
        }
        return Response.ok(jsonObject.toString(), MediaType.APPLICATION_JSON).build();
    }

}