using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendCreo.Models;
using backendCreo.Logic;
using backendCreo.AdditionalModels;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using static backendCreo.Token;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.Net.Mail;

namespace backendCreo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly CreoContext _context;

        HelperToken helper;

        public UsuariosController(CreoContext context, IConfiguration configuration)
        {
            _context = context;
            this.helper = new HelperToken(configuration);
          
        }

        // GET: api/Usuarios
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            return await _context.Usuario.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Usuarioid)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("[action]")]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {


            var pass = SecurityLogic.GetMD5Password(usuario.Pass);

            Usuario newUsuario = new Usuario();

            newUsuario.Fullname = usuario.Fullname;
            newUsuario.Email = usuario.Email;
            newUsuario.Pass = pass;
            //newUsuario.Pass = usuario.Pass;
            newUsuario.Typeuser = usuario.Typeuser;

            _context.Usuario.Add(newUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.Usuarioid }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuario.Any(e => e.Usuarioid == id);
        }



        [HttpPost("[action]")]
        public async Task<dynamic> Authenticate(Authenticate credenciales)
        {
            //_context.Usuario.Add(Usuario);
            //var resul = "";
            var pass = SecurityLogic.GetMD5Password(credenciales.Password);
            var Usuario = await _context.Usuario.FirstOrDefaultAsync(p => p.Email == credenciales.Email && p.Pass== pass);

            if (Usuario == null)
            {
                return new { Resul = "Credenciales incorrectas"};
            }
            else
            {
                Usuario newUsuario = new Usuario();

                newUsuario.Fullname = Usuario.Fullname;
                newUsuario.Email = Usuario.Email;
                newUsuario.Pass= "";
                newUsuario.Typeuser = Usuario.Typeuser;


                //var claims = new Claim[]
                //{
                //new Claim("Admin",newUsuario.Typeuser)
                //};

                JwtSecurityToken token = new JwtSecurityToken
                (
                 issuer: helper.Issuer
                 , audience: helper.Audience
                 , claims: null
                 , expires: DateTime.UtcNow.AddMinutes(10)
                 , notBefore: DateTime.UtcNow
                 , signingCredentials:
                new SigningCredentials(this.helper.GetKeyToken(), SecurityAlgorithms.HmacSha256)
                );

                var response = new JwtSecurityTokenHandler().WriteToken(token);

                return new { Resul = "Credenciales correctas", Usuario = newUsuario, Payload = response };
            }
        }

        [HttpPost("[action]")]
        public async Task<dynamic> ValidationEmail(Authenticate credenciales)
        {
            //_context.Usuario.Add(Usuario);
            //var resul = "";
            var Usuario = await _context.Usuario.FirstOrDefaultAsync(p => p.Email == credenciales.Email);

            if (Usuario == null)
            {
                return new { Resul = "El correo no existe" };
            }
            else
            {
                enviarEMail(Usuario.Email);
                return "Correo encontrado";
            }
        }

        public void enviarEMail(string correo)
        {
            MailMessage Correo = new MailMessage();
            Correo.From = new MailAddress(correo);
            Correo.To.Add(correo);
            Correo.Subject = ("Recuperar Contraseña La Lucha");
            Correo.Body = "Hola! Buen dia, Usted solicito recuperar su contraseña: " + "contraseña del cliente";
            Correo.Priority = MailPriority.Normal;

            SmtpClient ServerEmail = new SmtpClient();
            ServerEmail.Credentials = new NetworkCredential("elpantera142@gmail.com", "tvznxlgfzolhulmq");
            ServerEmail.Host = "smtp.gmail.com";
            ServerEmail.Port = 587;
            ServerEmail.EnableSsl = true;
            try
            {
                ServerEmail.Send(Correo);
            }
            catch (Exception e)
            {
                Console.Write("eroor al enviar el correo");
            }
            Correo.Dispose();
        }

    }
}
