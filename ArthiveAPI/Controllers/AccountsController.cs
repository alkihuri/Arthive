using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;

    public AccountsController(ITokenService tokenService, DataContext context, UserManager<User> userManager, IConfiguration configuration)
    {
        _tokenService = tokenService;
        _context = context;
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var managedUser = await _userManager.FindByEmailAsync(request.Email);
        
        if (managedUser == null)
        {
            return BadRequest("Bad credentials");
        }
        
        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);
        
        if (!isPasswordValid)
        {
            return BadRequest("Bad credentials");
        }
        
        var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
        
        if (user is null)
            return Unauthorized();

        var roleIds = await _context.UserRoles.Where(r => r.UserId == user.Id).Select(x => x.RoleId).ToListAsync();
        var roles = _context.Roles.Where(x => roleIds.Contains(x.Id)).ToList();
        
        var accessToken = _tokenService.CreateToken(user, roles);
        user.RefreshToken = _configuration.GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetSection("Jwt:RefreshTokenValidityInDays").Get<int>());

        await _context.SaveChangesAsync();
        
        return Ok(new AuthResponse
        {
            Username = user.UserName!,
            Email = user.Email!,
            Token = accessToken,
            RefreshToken = user.RefreshToken
        });
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid) return BadRequest("1");
        
        var user = new User
        {
            Email = request.Email, 
            UserName = request.Email
        };
        var result = await _userManager.CreateAsync(user, request.Password);

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        if (!result.Succeeded) return BadRequest(ModelState);
        
        var findUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

        if (findUser == null) throw new Exception($"User {request.Email} not found");

        await _userManager.AddToRoleAsync(findUser, RoleConsts.Member);
            
        return await Authenticate(new AuthRequest
        {
            Email = request.Email,
            Password = request.Password
        });
    }
    
    [HttpPost]
    [Route("refresh-token")]
    public async Task<IActionResult> RefreshToken(TokenModel? tokenModel)
    {
        if (tokenModel is null)
        {
            return BadRequest("Invalid client request");
        }

        var accessToken = tokenModel.AccessToken;
        var refreshToken = tokenModel.RefreshToken;
        var principal = _configuration.GetPrincipalFromExpiredToken(accessToken);
        
        if (principal == null)
        {
            return BadRequest("Invalid access token or refresh token");
        }
        
        var username = principal.Identity!.Name;
        var user = await _userManager.FindByNameAsync(username!);

        if (user == null || user.RefreshToken != refreshToken)// || user.RefreshTokenExpiryTime <= DateTime.UtcNow) // вот что вам мешало
        {
            return BadRequest("Invalid access token or refresh token");
        }

        var newAccessToken = _configuration.CreateToken(principal.Claims.ToList());
        var newRefreshToken = _configuration.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _userManager.UpdateAsync(user);

        return new ObjectResult(new
        {
            accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
            refreshToken = newRefreshToken
        });
    }
    
    [Authorize]
    [HttpPost]
    [Route("revoke/{username}")]
    public async Task<IActionResult> Revoke(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null) return BadRequest("Invalid user name");

        user.RefreshToken = null;
        await _userManager.UpdateAsync(user);

        return Ok();
    }
    
    [Authorize]
    [HttpPost]
    [Route("revoke-all")]
    public async Task<IActionResult> RevokeAll()
    {
        var users = _userManager.Users.ToList();
        foreach (var user in users)
        {
            user.RefreshToken = null;
            await _userManager.UpdateAsync(user);
        }

        return Ok();
    }


    //для примера работы Authorize
    // в сваггере можно посмотреть, что метод test-auth доступен только авторизованным пользователям
    // авторизация происходит через bearer token через замочек в верхнем правом угоу
    // в реальной жизни токен гуляет на фронте как поулчит его через логин
    [Authorize]
    [HttpGet("test-auth")]
    public IActionResult Test()
    {
        return Ok("Test authorized");
    }

    [HttpGet("test")]
    public IActionResult Test2()
    {
        return Ok("Test not authorized");
    }
}