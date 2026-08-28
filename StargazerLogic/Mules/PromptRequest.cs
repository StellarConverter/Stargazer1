using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Stargazer.StargazerLogic.Mules
{
    [ExportTsClass]
    public class PromptRequest
    {
        public string? ConversationID { get; set; } = null;
        public string Prompt { get; set; }
    }
}
