using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stargazer.StargazerLogic;
using Stargazer.StargazerLogic.LLM;
using Stargazer.StargazerLogic.Mules;
using System.Text;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        [HttpPost(Name = "DoPtompt")]
        public async IAsyncEnumerable<string> Post([FromBody] PromptRequest req)
        {
            var result = new PromptResponse();
            var history = new List<string>();//lolcat --- actaully do somehing with this
            await foreach (var token in LlamaWrapper.DoIt(req.Prompt, history))
            {
                yield return (token == null) ? string.Empty : token;
            }
        }
    }
}
