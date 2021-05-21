# convert me to some CI/CD file when it runs in one, github maybe?
# https://github.com/coverlet-coverage/coverlet/blob/master/Documentation/VSTestIntegration.md
# https://github.com/coverlet-coverage/coverlet/blob/master/Documentation/MSBuildIntegration.md#excluding-from-coverage

# build images
docker build -t yournamespaceapi2:latest ./yournamespaceapi2
docker build -t yournamespaceapi3:latest ./yournamespaceapi3
docker build -t yournamespaceapi4:latest ./yournamespaceapi4

# replace settings with runsettings.xml
#dotnet test ./Your.Namespace.sln -p:CollectCoverage=true -p:CoverletOutputFormat=opencover -p:Threshold=80 -p:ThresholdStat=total
#dotnet test ./Your.Namespace.sln -p:CollectCoverage=true -p:CoverletOutputFormat=cobertura -p:Threshold=80 -p:ThresholdStat=total

# may need this if a WPF app is in the solution as that is not supported by dotnet core at this time
# -->    find . -type d -name "*.Tests" -exec sh -c 'dotnet test "$0"' {} \;
