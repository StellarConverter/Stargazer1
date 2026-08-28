using Microsoft.SemanticKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using Newtonsoft.Json;
using System.Text;

namespace Stargazer.StargazerLogic.LLM
{
    internal class LaunchInfosPlugIn
    {
        [KernelFunction("get_launches")]
        [Description("Gets the list of Launches")]
        public async Task<string> GetLaunchInfos()
        {
            var sb = new StringBuilder();

            sb.AppendLine("This is the list of Launches in JSON format: ");

            var qqq = JsonConvert.SerializeObject(SimpleRepo.AllLaunchEvents);
            sb.AppendLine(qqq);
            /*
            int index = 1;
            foreach (var launch in SimpleRepo.AllLaunchEvents)
            {
                sb.Append("Laucn " + index.ToString()+ ": ");
                sb.AppendLine(launch.LaunchSite);
            }
            */
            return sb.ToString();
        }
    }
}
