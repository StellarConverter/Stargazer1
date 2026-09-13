using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Stargazer.StargazerLogic;
using Stargazer.StargazerLogic.Mules;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaunchesController : ControllerBase
    {
        [HttpGet(Name = "GetLaunches")]
        public List<LaunchEvent> Get()
        {
            return SimpleRepo.AllLaunchEvents;
        }
    }
}
