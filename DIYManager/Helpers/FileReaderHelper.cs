using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace DIYManager.Helpers
{
    public static class FileReaderHelper
    {
        public static string ReadImageFileContent(IFormFile file)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);

                var fileContent = stream.ToArray();

                var fileContentAsString = Convert.ToBase64String(fileContent);

                return fileContentAsString;
            }
        }
    }
}
