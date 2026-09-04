using HtmlAgilityPack;
using Stargazer.StargazerLogic.Mules;

namespace Stargazer.StargazerLogic
{
    public static class SimpleRepo
    {
        private static List<LaunchEvent> _allLaunchEvents = null;
        private static string launchScheduleUrl = @"https://spaceflightnow.com/launch-schedule/";

        private static async Task<List<LaunchEvent>> loadAllLaunchEvents()
        {
            var result = new List<LaunchEvent>();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Stargazer");
                string htmlContent = await client.GetStringAsync(SimpleRepo.launchScheduleUrl);
                //                string htmlContent = File.ReadAllText("../Storage/exemplar.txt");

                var doc = new HtmlDocument();
                doc.LoadHtml(htmlContent);

                var scheduleHtmlChunks = doc.DocumentNode.Descendants("div")
                    .Where(el => el.Id == "main-content")
                    .ToList();

                if (scheduleHtmlChunks.Count == 1)
                {
                    var mainContentDiv = scheduleHtmlChunks.Single();

                    var currentEvent = new LaunchEvent();

                    foreach (var divNode in mainContentDiv.ChildNodes.Where(rec => rec.NodeType == HtmlNodeType.Element))
                    {
                        var classAttr = divNode.Attributes.Where(rec => string.Equals(rec.Name, "class", StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
                        if (classAttr != null)
                        {
                            var seekString = string.Empty;
                            var divText = divNode.InnerText;//LOLCAT -- sanitize this...
                            switch (classAttr.Value.ToLower())
                            {
                                case "datename":
                                    var dateAndCraft = divText.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);
                                    if (dateAndCraft.Length == 2)
                                    {
                                        currentEvent.LaunchDate = dateAndCraft[0];
                                        currentEvent.CraftType = dateAndCraft[1];
                                    }

                                    break;
                                case "missiondata":
                                    seekString = "launch site:";
                                    var idx = divText.ToLower().IndexOf(seekString);
                                    if (idx > 0)
                                    {
                                        currentEvent.LaunchSite += divText.Substring(idx + (seekString.Length));
                                    }
                                    break;
                                case "missdescrip":
                                    //     currentEvent.Mission = divText; //commenting this out for now, it apears to be overflowing the prompt window.   I need a better model....
                                    result.Add(currentEvent);
                                    currentEvent = new LaunchEvent();
                                    break;
                            }

                        }

                    }
                }
                else
                {
                    result.Add(new LaunchEvent() { Mission = "Error getting schedule cotennt.  Expected 1 main-content div, found " + scheduleHtmlChunks.Count.ToString() });
                }
            }
            return result;
        }

        private static object _allLaunchEventsLockObject = new object();
        public static List<LaunchEvent> AllLaunchEvents
        {
            get
            {
                lock (_allLaunchEventsLockObject)
                {
                    if (SimpleRepo._allLaunchEvents == null)
                    {
                        SimpleRepo._allLaunchEvents = loadAllLaunchEvents().Result;
                    }
                }

                return SimpleRepo._allLaunchEvents;
            }
        }
    }
}
