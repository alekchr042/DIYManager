using System.ComponentModel.DataAnnotations;

namespace DIYManager.Models.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
