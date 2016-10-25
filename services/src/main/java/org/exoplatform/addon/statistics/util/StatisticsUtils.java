package org.exoplatform.addon.statistics.util;

import org.hibernate.stat.QueryStatistics;

/**
 * Created ngammoudi exo on 9/16/16.
 */
public class StatisticsUtils {

    public static double toTotalAverageTime(QueryStatistics statistics) {
        return statistics.getExecutionCount() * toAverageExecutionTime(statistics);
    }

    public static double toAverageExecutionTime(QueryStatistics statistics) {
        return statistics.getExecutionAvgTime() == 0 ? 0.001 : statistics.getExecutionAvgTime();
    }

    public static double toQueryPerformance(QueryStatistics statistics) {
        return toQueryPerformance(toTotalAverageTime(statistics),statistics.getExecutionCount());
    }

    public static double toQueryPerformance(double totalTimeOnDb, double invocations) {
        return totalTimeOnDb / invocations;
    }

    public static double performanceTableCell(double maxPerformance, double performance) {
        return maxPerformance == 0 ? 0 : performance / maxPerformance;

    }

}
