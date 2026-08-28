using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Stargazer.StargazerLogic.Mules
{
    [ExportTsClass]
    public class PromptResponse
    {
        public string Content { get; set; }
    }
}
