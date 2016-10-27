package org.exoplatform.addon.statistics.services;

/**
 * Created by ngammoudi on 10/27/16.
 */
public interface StatisticsDataStorage {

    long getSpacesCount();
    long getIdentitiesCount();
    long getActivitiesCount();
    long getConnectionsCount();
    long getSpaceMemberCount();
    long getPagesCount();
    long getTemplatesCount();
    long getPageAttachmentCount();


}
