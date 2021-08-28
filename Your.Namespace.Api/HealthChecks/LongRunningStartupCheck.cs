using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

public class LongRunningStartupCheck : IHealthCheck
{
    private volatile bool _startupTaskCompleted = false;

    public string Name => "slow_dependency_check";

    public bool IsReady { get; set; }

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        if (IsReady)
            return Task.FromResult(HealthCheckResult.Healthy("The startup task is finished."));
        return Task.FromResult(HealthCheckResult.Unhealthy("The startup task is still running."));
    }
}