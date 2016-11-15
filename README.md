# monitoring
Real Time monitoring of eXo Platform

A monitoring tool that allows administrators to monitor some exo applications in real time such as :

- [Hibernate] (http://hibernate-jcons.sourceforge.net/) monitor via its JMX exports  (performance for hibernate queries,entities and collections).
- eXo Caches statistics (HitCount,MissCount,HitRatio,MissRatio,...)
- Portlets response time (Max execution time,Min time ,average time...)
- Templates response time (Max execution time,Min time ,average time...)
- JPA applications statistics (Activities count ,Spaces count,Identities count,...)

All available metrics are described with details in the following sections:


Queries:
===============

![The HQL Queries Details](https://github.com/exo-addons/monitoring/blob/master/webapps/docs/images/Queries.png)

* Performance: the relative performance in comparison to other queries (the single query performance is estimated using avg-time*total-invocations)
* Time in DB: the total amount of time spent inside the DB (the time is estimated using avg-time*direct-invocations.
* Invocations: The total amount of invocations (caches & direct)
* Rows Fetched : The number of rows directly fetched from the DB.
Collections:
===============
![Collections Details](https://github.com/exo-addons/monitoring/blob/master/webapps/docs/images/Collections.png)

* Performance:  Displays the ratio between lightweight load (without an additional DB query) and any operation that issues  an additional read or write on the database
* Access Count : Th number for time the collection was accessed.
* Loads:Th number for time the collection was loaded witout requiring an additional DB query.
* Recreations: The number of times a full deletion and full re-insertion was performed (heavyweight operation).
* Fetches:The number of time that a separate DB query was required to retrieve the collection.
* Modifications:The number of times the collection was updated.

Entities:
===============
![Entities Details](https://github.com/exo-addons/monitoring/blob/master/webapps/docs/images/Entities.png)

* Performance:  Displays the ratio between lightweight load (without an additional DB query) and any operation that issues  an additional read or write on the database
* Access Count : Th number for time the entity was accessed.
* Loads:Th number for time the entity was loaded witout requiring an additional DB query.
* Fetches:The number of time that a separate DB query was required to retrieve the entity.
* Optimistic Faults: The number of times a concurrent modification caused an optimistic lock failure inside the DB.
* Modifications:The number of times the entity was updated.

Caches:
===============
![Caches Details](https://github.com/exo-addons/monitoring/blob/master/webapps/docs/images/Caches.png)

* HitCount: The total number of times the cache was successfully queried.
* MissCount: The total number of times the cache was queried without success.
* Hit Ratio: The ratio of the number of cache hits to the number of misses.
* Miss Ratio:The ratio of the number of cache misses to the number of hits.
* Capacity:The maximum capacity of the cache.
* Size: The number of entries in the cache.
* TimeToLive: The valid period of the cache in seconds. If the value is set to -1, the cache never expires.

Portlets:
===============






