using TypeGen.Core.TypeAnnotations;

namespace Stargazer.StargazerLogic.Mules
{
    [ExportTsClass]
    public class LaunchEvent
    {
        public string LaunchDate { get; set; } = string.Empty;
        public string LaunchSite { get; set; } = string.Empty;
        public string CraftType { get; set; } = string.Empty;
        public string Mission { get; set; } = string.Empty;
    }
}
