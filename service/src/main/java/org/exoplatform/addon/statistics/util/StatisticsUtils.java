package org.exoplatform.addon.statistics.util;

import org.hibernate.stat.QueryStatistics;

/**
 * Created ngammoudi exo on 9/16/16.
 */
public class StatisticsUtils {
    public static double toRatio(long leftValue, long rightValue)
    {
        if ((leftValue == 0L) && (rightValue == 0L))
            return 0.0D;
        return leftValue / (rightValue + leftValue);
    }

    public static double toTotalAverageTime(QueryStatistics statistics) {
        return statistics.getExecutionCount() * toAverageExecutionTime(statistics);
    }

    public static double toAverageExecutionTime(QueryStatistics statistics) {
        return statistics.getExecutionAvgTime() == 0L ? 0.001D : statistics.getExecutionAvgTime();
    }

    public static double toQueryPerformance(QueryStatistics statistics) {
        return toQueryPerformance(toTotalAverageTime(statistics), statistics.getCacheHitCount() + statistics.getExecutionCount());
    }

    public static double toQueryPerformance(double totalTimeOnDb, double invocations) {
        return totalTimeOnDb / invocations;
    }

    public static double performanceTableCell(double maxPerformance, double performance)
    {

        return maxPerformance == 0 ? 0 : performance / maxPerformance;



    }

}
