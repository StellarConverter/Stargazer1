using TypeGen.Core.TypeAnnotations;

namespace Stargazer.Server.Mules
{
    [ExportTsClass]
    public class LaunchEvent
    {
        public string LaunchDateString { get; set; } = string.Empty;
        public string LaunchSite { get; set; } = string.Empty;
        public string CraftType { get; set; } = string.Empty;
        public string Mission { get; set; } = string.Empty;
    }
}
