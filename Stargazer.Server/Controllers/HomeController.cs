using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Stargazer.StargazerLogic;
using Stargazer.StargazerLogic.Mules;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet(Name = "GotHomeSummary")]
        public HomeSummaryInfo Get()
        {
            var result = new HomeSummaryInfo();
            result.LaunchCount = SimpleRepo.AllLaunchEvents.Count;

            return result;
        }
    }
}
