using Microsoft.SemanticKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using Newtonsoft.Json;
using System.Text;

namespace Stargazer.StargazerLogic.LLM
{
    public class GetDatePlugIn
    {
        [KernelFunction("get_date")]
        [Description("Gets the current date")]
        public async Task<string> GetDate()
        {
            return "The current date is " + DateTime.Now.ToString("yyyy-MM-dd") + ".";
        }

    }
}
