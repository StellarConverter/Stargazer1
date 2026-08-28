using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stargazer.StargazerLogic;
using Stargazer.StargazerLogic.Mules;
using Stargazer.StargazerLogic.Utils;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        [HttpPost(Name = "DoPtompt")]
        public PromptResponse Post([FromBody] PromptRequest req)
        {
            var result = new PromptResponse();
            var history = new List<string>();//lolcat --- actaully do somehing with this
            result.Content = LlamaWrapper.DoIt(req.Prompt, history).Result;
            return result;
        }
    }
}
