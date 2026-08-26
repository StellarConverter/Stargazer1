using Microsoft.AspNetCore.Mvc;

namespace Stargazer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomerController : ControllerBase
    {
        [HttpGet(Name = "GetHomer")]
        public string Get()
        {
            return "woowee";
        }
    }
}
