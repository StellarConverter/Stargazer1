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
        public async Task<PromptResponse> Post([FromBody] PromptRequest req)
        {
            var result = new PromptResponse();
            var history = new List<string>();//lolcat --- actaully do somehing with this

            var sb = new StringBuilder();

            await foreach(var token in LlamaWrapper.DoIt(req.Prompt, history))
            {
                sb.Append(token);
            }

            result.Content = sb.ToString();
            return result;
        }
    }
}
