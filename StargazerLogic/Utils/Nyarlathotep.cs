using System.Reflection;
using TypeGen.Core.Generator;

namespace Stargazer.StargazerLogic.Util
{
    /// <summary>
    /// This class causes TypeGen to generate the client-side TS files from the CS mule classes in this folder (assembly, really, but they're all in this folder)
    /// </summary>
    public class Nyarlathotep
    {
        public static void DoIt()
        {


            //            var options = new GeneratorOptions { BaseOutputDirectory = @"C:\src\output" }; // create the options object
            var options = new GeneratorOptions { BaseOutputDirectory = @"..\stargazer.client\Mules" }; // create the options object
            var generator = new Generator(options);
            var assembly = Assembly.GetCallingAssembly(); // get the assembly to generate files for
            generator.Generate(assembly); // generates the files
        }
    }
}
