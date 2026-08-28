using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Namotion.Reflection;
using Stargazer.StargazerLogic;
using Stargazer.StargazerLogic.Mules;
using System.Reflection;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StupidController : ControllerBase
    {
        [HttpGet(Name = "GetStupid")]
        public List<LaunchEvent> Get()
        {
//                        StargazerLogic.Util.Nyarlathotep.DoIt();

            return SimpleRepo.AllLaunchEvents.ToList();
        }
    }
}
