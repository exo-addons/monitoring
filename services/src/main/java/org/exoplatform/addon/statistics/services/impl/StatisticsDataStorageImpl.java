package org.exoplatform.addon.statistics.services.impl;

import org.exoplatform.addon.statistics.services.StatisticsDataStorage;
import org.exoplatform.social.core.identity.provider.OrganizationIdentityProvider;
import org.exoplatform.social.core.identity.provider.SpaceIdentityProvider;
import org.exoplatform.social.core.jpa.storage.dao.jpa.ActivityDAOImpl;
import org.exoplatform.social.core.jpa.storage.dao.jpa.ConnectionDAOImpl;
import org.exoplatform.social.core.jpa.storage.dao.jpa.IdentityDAOImpl;
import org.exoplatform.social.core.jpa.storage.dao.jpa.SpaceMemberDAOImpl;
import org.exoplatform.wiki.jpa.dao.PageAttachmentDAO;
import org.exoplatform.wiki.jpa.dao.PageDAO;
import org.exoplatform.wiki.jpa.dao.TemplateDAO;

/**
 * Created by ngammoudi on 10/27/16.
 */
public class StatisticsDataStorageImpl implements StatisticsDataStorage {

private IdentityDAOImpl identityDAO;
private ActivityDAOImpl activityDAO;
private ConnectionDAOImpl connectionDAO;
private SpaceMemberDAOImpl spaceMemberDAO;
private PageDAO pageDAO;
private TemplateDAO templateDAO;
private PageAttachmentDAO pageAttachmentDAO;

    public StatisticsDataStorageImpl(IdentityDAOImpl identityDAO, ActivityDAOImpl activityDAO, ConnectionDAOImpl connectionDAO, SpaceMemberDAOImpl spaceMemberDAO, PageDAO pageDAO, TemplateDAO templateDAO, PageAttachmentDAO pageAttachmentDAO){
        this.identityDAO=identityDAO;
        this.activityDAO=activityDAO;
        this.connectionDAO=connectionDAO;
        this.spaceMemberDAO=spaceMemberDAO;
        this.pageDAO=pageDAO;
        this.templateDAO=templateDAO;
        this.pageAttachmentDAO=pageAttachmentDAO;


    }

    @Override
    public long getSpacesCount() {
        return identityDAO.countIdentityByProvider(SpaceIdentityProvider.NAME);
    }

    @Override
    public long getIdentitiesCount() {
        return identityDAO.countIdentityByProvider(OrganizationIdentityProvider.NAME);
    }

    @Override
    public long getActivitiesCount() {
        return activityDAO.count();
    }

    @Override
    public long getConnectionsCount() {
        return connectionDAO.count();
    }

    @Override
    public long getSpaceMemberCount() {
        return spaceMemberDAO.count();
    }

    @Override
    public long getPagesCount() {
        return pageDAO.count();
    }

    @Override
    public long getTemplatesCount() {
        return templateDAO.count();
    }

    @Override
    public long getPageAttachmentCount() {
        return pageAttachmentDAO.count();
    }
}
